package by.gstu.itp.palletprod.config.security;

import by.gstu.itp.palletprod.model.user.Role;
import by.gstu.itp.palletprod.provider.JwtTokenProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


/**
 * Класс с описанием конфигурации Spring Security.
 *
 * @author Evgeniy Trofimov
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider tokenProvider;
    private final AuthenticationEntryPointHandler authenticationEntryPoint;

    public SecurityConfig(JwtTokenProvider tokenProvider, AuthenticationEntryPointHandler authenticationEntryPoint) {
        this.tokenProvider = tokenProvider;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/auth/*").anonymous()
                .antMatchers(HttpMethod.GET, "/positions").hasAnyRole(Role.EMPLOYEE.name(), Role.ADMIN.name())
                .antMatchers(HttpMethod.GET, "/api/auth/profile").hasAnyRole(Role.EMPLOYEE.name(), Role.ADMIN.name())
                .antMatchers(HttpMethod.GET,
                        "/user-employee/*"
                    ).hasRole(Role.EMPLOYEE.name())
                .anyRequest().hasRole(Role.ADMIN.name())
            .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), tokenProvider))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), tokenProvider))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .headers();
    }
}

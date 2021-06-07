package by.gstu.itp.palletprod.config.security;

import by.gstu.itp.palletprod.dto.AuthenticationDto;
import by.gstu.itp.palletprod.provider.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedCredentialsNotFoundException;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * Фильтр производящий аутентификацию пользователя по логину и паролю.
 * Возвращает Access и Refresh токен.
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final ObjectMapper mapper = new ObjectMapper();
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        setFilterProcessesUrl("/api/auth/login");
    }

    /**
     * Производит попытку аутентификации пользователя в системе.
     * 
     * @param request {HttpServletRequest}
     * @param response {HttpServletResponse}
     * @return Authentication
     * @throws AuthenticationException
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException { // NOSONAR
        try {
            final AuthenticationDto credentials = mapper.readValue(request.getInputStream(), AuthenticationDto.class);
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    credentials.getEmail(),
                    credentials.getPassword()
            ));
        } catch (IOException e) {
            throw new PreAuthenticatedCredentialsNotFoundException(e.getMessage());
        }
    }

    /**
     * Возвращает пользователю токен при успешной аутентификации.
     *
     * @param request {HttpServletRequest}
     * @param response {HttpServletResponse}
     * @param chain {FilterChain}
     * @param authResult {Authentication}
     * @throws IOException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException {
        final String email = ((UserDetails)authResult.getPrincipal()).getUsername(); // is email
        final Map<String, String> tokens = tokenProvider.getActualToken(email);
        response.getWriter().write(mapper.writeValueAsString(tokens));
        response.getWriter().flush();
    }
}

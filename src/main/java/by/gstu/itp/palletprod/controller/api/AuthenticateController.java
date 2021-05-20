package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.AuthenticationDto;
import by.gstu.itp.palletprod.dto.UserDto;
import by.gstu.itp.palletprod.exception.JwtAuthenticationException;
import by.gstu.itp.palletprod.model.user.User;
import by.gstu.itp.palletprod.provider.JwtTokenProvider;
import by.gstu.itp.palletprod.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthenticateController {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;

    public AuthenticateController(JwtTokenProvider jwtTokenProvider, AuthService authService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authService = authService;
    }

    @PostMapping("refresh")
    public ResponseEntity<?> refresh(@RequestBody String token) { // NOSONAR
        try {
            return ResponseEntity.ok(jwtTokenProvider.refreshToken(token));
        } catch (JwtAuthenticationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("profile")
    public UserDto getProfile(Authentication authentication) {
        return authService.getProfile(authentication);
    }

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> registration(@RequestBody @Valid AuthenticationDto dto) {
        Map<String, String> tokens = jwtTokenProvider.createAndSaveTokens(authService.regEmployeeUser(dto).getEmail());
        return tokens;
    }
}

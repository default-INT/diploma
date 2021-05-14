package by.gstu.itp.palletprod.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {
    private final HttpStatus status;

    public JwtAuthenticationException(String msg, HttpStatus status) {
        super(msg);
        this.status = status;
    }

    public JwtAuthenticationException(String msg) {
        super(msg);
        this.status = null;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

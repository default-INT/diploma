package by.gstu.itp.palletprod.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceItemNotFoundException extends RuntimeException {
    public ResourceItemNotFoundException() {
    }

    public ResourceItemNotFoundException(String message) {
        super(message);
    }

    public ResourceItemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

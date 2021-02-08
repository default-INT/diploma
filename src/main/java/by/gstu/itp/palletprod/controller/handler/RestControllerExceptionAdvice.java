package by.gstu.itp.palletprod.controller.handler;

import by.gstu.itp.palletprod.controller.handler.response.DataExceptionResponse;
import by.gstu.itp.palletprod.exception.DataValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;

@ControllerAdvice
@ResponseBody
public class RestControllerExceptionAdvice {
    private static final String ERROR_KEY = "__error";

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataValidationException.class)
    public DataExceptionResponse dataValidationExceptionHandler(DataValidationException e) {
        final BindingResult bindingResult = e.getBindingResult();
        if (bindingResult != null) {
            return DataExceptionResponse.from(bindingResult.getFieldErrors());
        } else {
            final HashMap<String, String> map = new HashMap<>();
            map.put(ERROR_KEY, e.getMessage());
            return new DataExceptionResponse(map);
        }
    }
}

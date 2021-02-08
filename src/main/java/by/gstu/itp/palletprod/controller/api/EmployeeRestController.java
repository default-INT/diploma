package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import by.gstu.itp.palletprod.exception.DataValidationException;
import by.gstu.itp.palletprod.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeRestController {

    private final EmployeeService employeeService;

    public EmployeeRestController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("{page}")
    public List<EmployeeDto> findAll(@PathVariable int page,
                                     @RequestParam(name = "size", defaultValue = "0") int size,
                                     @RequestParam(name = "lastName", defaultValue = "") String lastName) {
        --page;
        if (size <= 0 || size > 20) {
            size = 20;
        }
        return employeeService.findAll(page, size);
    }

    @GetMapping
    public List<EmployeeDto> findAll(@RequestParam(name = "lastName", defaultValue = "") String lastName) {
        return employeeService.findAllByLastNameStartingWith(lastName);
    }

    @PostMapping
    public EmployeeDto add(@RequestBody @Valid EmployeeDto employeeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return employeeService.add(employeeDto);
    }

    @PutMapping
    public EmployeeDto update(@RequestParam @Valid EmployeeDto employeeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return employeeService.update(employeeDto);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestBody EmployeeDto employeeDto) {
        employeeService.delete(employeeDto);
        return ResponseEntity.ok("Delete employee is successful");
    }
}

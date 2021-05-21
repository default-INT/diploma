package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import by.gstu.itp.palletprod.exception.DataValidationException;
import by.gstu.itp.palletprod.service.EmployeeService;
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

    @GetMapping("/count")
    public int countEmployee() {
        return employeeService.countAvailableEmployee();
    }


    @GetMapping("{page}")
    public List<EmployeeDto> findAll(@PathVariable int page,
                                     @RequestParam(name = "size", defaultValue = "0") int size,
                                     @RequestParam(name = "fired", defaultValue = "false") boolean fired,
                                     @RequestParam(name = "lastName", defaultValue = "") String lastName) {
        --page;
        if (size <= 0 || size > 20) {
            size = 20;
        }
        return employeeService.findAll(page, size, fired, lastName);
    }

    @GetMapping
    public List<EmployeeDto> findAll(@RequestParam(name = "lastName", defaultValue = "") String lastName,
                                     @RequestParam(name = "fired", defaultValue = "false") boolean fired) {
        return employeeService.findAllByLastNameStartingWith(lastName, fired);
    }

    @PostMapping
    public EmployeeDto add(@RequestBody @Valid EmployeeDto employeeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return employeeService.add(employeeDto);
    }

    @PutMapping
    public EmployeeDto update(@RequestBody @Valid EmployeeDto employeeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return employeeService.update(employeeDto);
    }

    @DeleteMapping
    public boolean delete(@RequestBody EmployeeDto employeeDto) {
        return employeeService.delete(employeeDto);
    }

    @DeleteMapping("/fire/{employeeId}")
    public boolean fireEmployee(@PathVariable String employeeId) {
        return employeeService.fireEmployee(employeeId);
    }
}

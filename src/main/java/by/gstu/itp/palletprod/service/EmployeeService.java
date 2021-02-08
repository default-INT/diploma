package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<EmployeeDto> findAll(int page, int size) {
        if (size > 20 || size < 0) {
            throw new IllegalArgumentException("Limit is too much");
        }

        if (size == 0) {
            return Collections.emptyList();
        }
        return employeeRepository.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "id"))
                .map(EmployeeDto::of)
                .toList();
    }

    public List<EmployeeDto> findAllByLastNameStartingWith(final String lastName) {
        return employeeRepository.findAllByLastNameStartingWith(lastName)
                .stream()
                .map(EmployeeDto::of)
                .collect(Collectors.toList());
    }

    public List<EmployeeDto> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(EmployeeDto::of)
                .collect(Collectors.toList());
    }

    public EmployeeDto add(final EmployeeDto employeeDto) {
        return EmployeeDto.of(employeeRepository.save(Employee.of(employeeDto)));
    }

    public EmployeeDto update(final EmployeeDto employeeDto) {
        final Employee updateEmployee = employeeRepository.findById(employeeDto.getId())
                .orElseThrow(IllegalArgumentException::new); //TODO: Custom Exception

        updateEmployee.setFirstName(employeeDto.getFirstName());
        updateEmployee.setSecondName(employeeDto.getSecondName());
        updateEmployee.setLastName(employeeDto.getLastName());
        updateEmployee.setBirthdayYear(employeeDto.getBirthdayYear());

        return EmployeeDto.of(employeeRepository.save(updateEmployee));
    }

    public void delete(final EmployeeDto employeeDto) {
        deleteById(employeeDto.getId());
    }

    public void deleteById(final String id) {
        employeeRepository.deleteById(id);
    }
}

package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Collection<Employee> findAll(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size)).toSet();
    }

    public Collection<Employee> findAll() {
        return employeeRepository.findAll();
    }
}

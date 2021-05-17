package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final EmployeeRepository employeeRepository;

    public CompanyService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public BigDecimal getAvgSalaryOnDay() {
        try {
            final List<Employee> employees = employeeRepository.findAllByFiredAndLastNameStartingWithAndDeletedFalse(false, "")
                    .stream()
                    .filter(employee -> employee.getEmployeeItems().size() > 0)
                    .collect(Collectors.toList());

            final BigDecimal totalSalary = employees.stream()
                    .map(employee -> employee.getEmployeeItems().stream()
                            .map(EmployeeItem::getTotalSalary)
                            .reduce(BigDecimal.ZERO, BigDecimal::add)
                            .divide(BigDecimal.valueOf(employee.getEmployeeItems().size()), RoundingMode.HALF_UP)
                    )
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            return totalSalary.divide(BigDecimal.valueOf(employees.size()), RoundingMode.HALF_UP);
        } catch (Exception e) {
            return new BigDecimal(0);
        }

    }
}

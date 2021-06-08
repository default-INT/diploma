package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.model.user.User;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import by.gstu.itp.palletprod.repository.UserRepository;
import by.gstu.itp.palletprod.repository.report.ReportRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CompanyService {
    private final EmployeeRepository employeeRepository;
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public CompanyService(EmployeeRepository employeeRepository, ReportRepository reportRepository, UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
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

    public BigDecimal getTotalSalaryOnMonth(final Authentication authentication) {
        final User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(NotFoundException::new);
        return getTotalSalaryOnMonth(user.getEmployee());
    }

    public BigDecimal getAvgSalaryForEmployee(final Authentication authentication) {
        final User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(NotFoundException::new);
        return getAvgSalaryOnMonthForEmployee(user.getEmployee());
    }

    private BigDecimal getTotalSalaryOnMonth(final Employee employee) {
        try {
            final List<Report> reports = getReportsForDateAfter();
            final Stream<EmployeeItem> employeeItemStream = reports.stream()
                    .flatMap(report -> report.getEmployeeItems().stream())
                    .filter(employeeItem -> employeeItem.getEmployeeId().equals(employee.getId()));
            return employeeItemStream.map(EmployeeItem::getTotalSalary)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        } catch (Exception e) {
            return new BigDecimal(0);
        }
    }

    private BigDecimal getAvgSalaryOnMonthForEmployee(final Employee employee) {
        try {
            final Stream<EmployeeItem> employeeItemStream = employee.getEmployeeItems().stream();

            final BigDecimal totalSalaryOnMonth = getTotalSalaryOnMonth(employee);

            final long countEmployeeItems = employeeItemStream.count();
            return totalSalaryOnMonth.divide(BigDecimal.valueOf(countEmployeeItems), RoundingMode.HALF_UP);
        } catch (Exception e) {
            return new BigDecimal(0);
        }
    }

    private List<Report> getReportsForDateAfter() {
        final LocalDate nowDate = LocalDate.now();
        final LocalDate dateAfter = nowDate.getDayOfMonth() <= 24
                ? LocalDate.of(nowDate.getYear(), nowDate.getMonth().minus(1), 25)
                : LocalDate.of(nowDate.getYear(), nowDate.getMonth(), 25);

        return reportRepository.findAllByDateAfter(dateAfter);

    }
}

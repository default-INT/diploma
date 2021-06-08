package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.report.UserReportDto;
import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.model.user.User;
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
public class UserService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public UserService(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    public BigDecimal getTotalSalaryOnMonth(final Authentication authentication) {
        final User user = getUser(authentication);
        return getTotalSalaryOnMonth(user.getEmployee());
    }

    public BigDecimal getAvgSalaryForEmployee(final Authentication authentication) {
        final User user = getUser(authentication);
        return getAvgSalaryOnMonthForEmployee(user.getEmployee());
    }

    public List<UserReportDto> getUserReports(final Authentication authentication) {
        final User user = getUser(authentication);
        final List<Report> reports = getReportsOnLastMonth();
        return getStreamEmployeeItemsByEmployeeFromReports(user.getEmployee(), reports)
                .map(UserReportDto::of)
                .collect(Collectors.toList());
    }

    private User getUser(final Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(NotFoundException::new);
    }

    private Stream<EmployeeItem> getStreamEmployeeItemsByEmployeeFromReports(final Employee employee, final List<Report> reports) {
        return reports.stream()
                .flatMap(report -> report.getEmployeeItems().stream())
                .filter(employeeItem -> employeeItem.getEmployeeId().equals(employee.getId()));
    }

    private BigDecimal getTotalSalaryOnMonth(final Employee employee) {
        try {
            final List<Report> reports = getReportsOnLastMonth();
            final Stream<EmployeeItem> employeeItemStream = getStreamEmployeeItemsByEmployeeFromReports(
                    employee, reports
            );

            return employeeItemStream.map(EmployeeItem::getTotalSalary)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        } catch (Exception e) {
            return new BigDecimal(0);
        }
    }

    private BigDecimal getAvgSalaryOnMonthForEmployee(final Employee employee) {
        try {
            final List<EmployeeItem> employeeItems = employee.getEmployeeItems();
            final Stream<EmployeeItem> employeeItemStream = employeeItems.stream();

            final BigDecimal totalSalary = employeeItemStream.map(EmployeeItem::getTotalSalary)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            final long countEmployeeItems = employeeItems.size();
            return totalSalary.divide(BigDecimal.valueOf(countEmployeeItems), RoundingMode.HALF_UP);
        } catch (Exception e) {
            return new BigDecimal(0);
        }
    }

    private List<Report> getReportsOnLastMonth() {
        final LocalDate nowDate = LocalDate.now();
        final LocalDate dateAfter = nowDate.getDayOfMonth() <= 24
                ? LocalDate.of(nowDate.getYear(), nowDate.getMonth().minus(1), 25)
                : LocalDate.of(nowDate.getYear(), nowDate.getMonth(), 25);

        return reportRepository.findAllByDateAfter(dateAfter);

    }
}

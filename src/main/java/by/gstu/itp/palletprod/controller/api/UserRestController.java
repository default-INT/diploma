package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.report.UserReportDto;
import by.gstu.itp.palletprod.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/user-employee")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/my-avg-salary")
    public BigDecimal getAvgSalary(final Authentication authentication) {
        return userService.getAvgSalaryForEmployee(authentication);
    }

    @GetMapping("/my-month-total-salary")
    public BigDecimal getMonthTotalSalary(final Authentication authentication) {
        return userService.getTotalSalaryOnMonth(authentication);
    }

    @GetMapping("/reports")
    public List<UserReportDto> getEmployeeReports(final Authentication authentication) {
        return userService.getUserReports(authentication);
    }
}

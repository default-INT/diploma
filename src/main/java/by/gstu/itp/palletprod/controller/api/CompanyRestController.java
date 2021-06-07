package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.service.CompanyService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/palletprod")
public class CompanyRestController {
    private final CompanyService companyService;

    public CompanyRestController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/avg-salary")
    public BigDecimal getAvgSalary() {
        return companyService.getAvgSalaryOnDay();
    }

    @GetMapping("/my-month-avg-salary")
    public BigDecimal getMonthAvgSalary(final Authentication authentication) {
        return companyService.getAvgSalaryOnMonthForEmployee(authentication);
    }

    @GetMapping("/my-month-total-salary")
    public BigDecimal getMonthTotalSalary(final Authentication authentication) {
        return companyService.getTotalSalaryOnMonth(authentication);
    }
}

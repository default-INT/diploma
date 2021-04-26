package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.service.CompanyService;
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
}

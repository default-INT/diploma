package by.gstu.itp.palletprod.dto.report;

import by.gstu.itp.palletprod.model.report.Report;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class ReportDto {
    public static ReportDto of(Report report) {
        final ReportDto reportDto = new ReportDto();

        reportDto.setId(report.getId());
        reportDto.setDate(report.getDate());
        reportDto.setTotalSalary(report.getTotalSalary());

        reportDto.setEmployeeItems(
                report.getEmployeeItems().stream().map(EmployeeItemDto::of)
                    .collect(Collectors.toList())
        );

        reportDto.setDayStats(
                report.getDayStats().stream().map(DayStatDto::of)
                        .collect(Collectors.toList())
        );

        return reportDto;
    }

    private String id;
    private LocalDate date;
    private BigDecimal totalSalary;

    private List<EmployeeItemDto> employeeItems;
    private List<DayStatDto> dayStats;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }

    public List<EmployeeItemDto> getEmployeeItems() {
        return employeeItems;
    }

    public void setEmployeeItems(List<EmployeeItemDto> employeeItems) {
        this.employeeItems = employeeItems;
    }

    public List<DayStatDto> getDayStats() {
        return dayStats;
    }

    public void setDayStats(List<DayStatDto> dayStats) {
        this.dayStats = dayStats;
    }
}

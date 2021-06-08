package by.gstu.itp.palletprod.dto.report;

import by.gstu.itp.palletprod.model.report.EmployeeItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class UserReportDto {
    public static UserReportDto of(final EmployeeItem employeeItem) {
        final UserReportDto userReportDto = new UserReportDto();

        userReportDto.setDate(employeeItem.getReport().getDate());
        userReportDto.setEmployeeItemId(employeeItem.getId());
        userReportDto.setWorkItems(
                employeeItem.getWorkItems().stream()
                        .map(WorkItemDto::of)
                        .collect(Collectors.toList())
        );
        userReportDto.setTotalSalary(employeeItem.getTotalSalary());

        return userReportDto;
    }

    private LocalDate date;
    private String employeeItemId;

    private List<WorkItemDto> workItems;

    private BigDecimal totalSalary;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getEmployeeItemId() {
        return employeeItemId;
    }

    public void setEmployeeItemId(String employeeItemId) {
        this.employeeItemId = employeeItemId;
    }

    public List<WorkItemDto> getWorkItems() {
        return workItems;
    }

    public void setWorkItems(List<WorkItemDto> workItems) {
        this.workItems = workItems;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }
}

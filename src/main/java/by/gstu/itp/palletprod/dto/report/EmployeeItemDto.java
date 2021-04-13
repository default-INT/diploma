package by.gstu.itp.palletprod.dto.report;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import by.gstu.itp.palletprod.model.report.EmployeeItem;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class EmployeeItemDto {
    public static EmployeeItemDto of(EmployeeItem employeeItem) {
        final EmployeeItemDto employeeItemDto = new EmployeeItemDto();

        employeeItemDto.setId(employeeItem.getId());
        employeeItemDto.setEmployeeId(employeeItem.getEmployeeId());
        employeeItemDto.setEmployee(EmployeeDto.of(employeeItem.getEmployee()));
        employeeItemDto.setWorkItems(
                employeeItem.getWorkItems().stream().map(WorkItemDto::of)
                    .collect(Collectors.toList())
        );
        employeeItemDto.setTotalSalary(employeeItem.getTotalSalary());

        return employeeItemDto;
    }

    private String id;

    private String employeeId;
    private EmployeeDto employee;

    private List<WorkItemDto> workItems;

    private BigDecimal totalSalary;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public EmployeeDto getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDto employee) {
        this.employee = employee;
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

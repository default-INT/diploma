package by.gstu.itp.palletprod.dto.statistic;

import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.Position;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.WorkItem;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EmployeeStatisticDto {
    public static EmployeeStatisticDto of(final Map.Entry<Employee, List<EmployeeItem>> employeeListEntry) {

        final EmployeeStatisticDto employeeStatisticDto = new EmployeeStatisticDto();

        employeeStatisticDto.setEmployee(employeeListEntry.getKey().getFullName());

        final Map<Position, List<WorkItem>> workItemMap = new HashMap<>();

        employeeListEntry.getValue().stream()
                .flatMap(employeeItem -> employeeItem.getWorkItems().stream())
                .forEach(workItem -> {
                    workItemMap.computeIfAbsent(workItem.getPosition(), k -> new ArrayList<>())
                            .add(workItem);
                });

        final List<StatisticItemDto> statisticItems = workItemMap.entrySet()
                .stream()
                .map(StatisticItemDto::of)
                .collect(Collectors.toList());

        employeeStatisticDto.setStatisticItems(statisticItems);
        employeeStatisticDto.setTotalSalary(
                employeeListEntry.getValue().stream()
                    .map(EmployeeItem::getTotalSalary)
                    .reduce(BigDecimal::add)
                    .orElse(new BigDecimal(0))
        );

        return employeeStatisticDto;
    }

    private String employee;
    private List<StatisticItemDto> statisticItems;
    private BigDecimal totalSalary;

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }

    public List<StatisticItemDto> getStatisticItems() {
        return statisticItems;
    }

    public void setStatisticItems(List<StatisticItemDto> statisticItems) {
        this.statisticItems = statisticItems;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }
}

package by.gstu.itp.palletprod.dto.statistic;

import by.gstu.itp.palletprod.model.Position;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.WorkItem;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class StatisticItemDto {
    public static StatisticItemDto of(final Map.Entry<Position, List<WorkItem>> workItemEntry) {
        final StatisticItemDto statisticItemDto = new StatisticItemDto();

        statisticItemDto.setPosition(workItemEntry.getKey().getName());
        statisticItemDto.setItemCount(
                workItemEntry.getValue().stream()
                    .map(WorkItem::getItemNum)
                    .reduce(Integer::sum)
                    .orElse(0)
        );
        statisticItemDto.setIncome(
                workItemEntry.getValue().stream()
                    .map(WorkItem::getSalary)
                    .reduce(BigDecimal::add)
                    .orElse(new BigDecimal(0))
        );
        statisticItemDto.setItemName(workItemEntry.getKey().getItemName());

        return statisticItemDto;
    }

    private String position;
    private int itemCount;
    private BigDecimal income;
    private String itemName;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public BigDecimal getIncome() {
        return income;
    }

    public void setIncome(BigDecimal income) {
        this.income = income;
    }
}

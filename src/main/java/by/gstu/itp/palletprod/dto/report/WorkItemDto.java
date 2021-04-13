package by.gstu.itp.palletprod.dto.report;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.model.report.WorkItem;

import java.math.BigDecimal;

public class WorkItemDto {
    public static WorkItemDto of(WorkItem workItem) {
        WorkItemDto workItemDto = new WorkItemDto();

        workItemDto.setId(workItem.getId());
        workItemDto.setPositionId(workItem.getPositionId());
        workItemDto.setPosition(PositionDto.of(workItem.getPosition()));
        workItemDto.setItemNum(workItem.getItemNum());
        workItemDto.setSalary(workItem.getSalary());

        return workItemDto;
    }

    private String id;

    private String positionId;
    private PositionDto position;

    private int itemNum;
    private BigDecimal salary;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public PositionDto getPosition() {
        return position;
    }

    public void setPosition(PositionDto position) {
        this.position = position;
    }

    public int getItemNum() {
        return itemNum;
    }

    public void setItemNum(int itemNum) {
        this.itemNum = itemNum;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }
}

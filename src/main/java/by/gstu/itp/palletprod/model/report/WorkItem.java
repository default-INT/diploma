package by.gstu.itp.palletprod.model.report;

import by.gstu.itp.palletprod.dto.report.WorkItemDto;
import by.gstu.itp.palletprod.model.Position;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "work_items")
public class WorkItem {
    public static WorkItem of(final WorkItemDto workItemDto) {
        final WorkItem workItem = new WorkItem();

        workItem.setId(workItemDto.getId());
        workItem.setPositionId(workItemDto.getPositionId());
        workItem.setItemNum(workItemDto.getItemNum());
        workItem.setSalary(workItemDto.getSalary());

        return workItem;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    @Column(name = "position_id", updatable = false, insertable = false)
    private String positionId;

    @Column(name = "item_num", nullable = false)
    private int itemNum;
    @Column(name = "salary", nullable = false)
    private BigDecimal salary;

    @Column(name = "employee_item_id", updatable = false, insertable = false)
    private String employeeItemId;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "employee_item_id", updatable = false, insertable = false)
    private EmployeeItem employeeItem;

    public String getEmployeeItemId() {
        return employeeItemId;
    }

    public void setEmployeeItemId(String employeeItemId) {
        this.employeeItemId = employeeItemId;
    }

    public EmployeeItem getEmployeeItem() {
        return employeeItem;
    }

    public void setEmployeeItem(EmployeeItem employeeItem) {
        this.employeeItem = employeeItem;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String reportPositionId) {
        this.positionId = reportPositionId;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

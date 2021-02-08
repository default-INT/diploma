package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.WorkPositionDto;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "work_positions")
public class WorkPosition {
    public static WorkPosition of(WorkPositionDto workPositionDto) {
        WorkPosition workPosition = new WorkPosition();

        workPosition.setId(workPositionDto.getId());
        workPosition.setName(workPositionDto.getName());
        workPosition.setItemName(workPositionDto.getItemName());
        workPosition.setItemTariff(workPositionDto.getItemTariff());

        return workPosition;
    }
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(unique = true)
    private String name;
    @Column(name = "item_tariff")
    private BigDecimal itemTariff;
    @Column(name = "item_name")
    private String itemName;

    @OneToMany(mappedBy = "workPosition")
    private List<WorkPositionReport> workPositionReports;

    public List<WorkPositionReport> getWorkPositionReports() {
        return workPositionReports;
    }

    public void setWorkPositionReports(List<WorkPositionReport> workPositionReports) {
        this.workPositionReports = workPositionReports;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getItemTariff() {
        return itemTariff;
    }

    public void setItemTariff(BigDecimal itemTariff) {
        this.itemTariff = itemTariff;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
}

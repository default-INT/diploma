package by.gstu.itp.palletprod.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "work_positions")
public class WorkPosition {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column
    private String name;
    @Column(name = "item_trariff")
    private BigDecimal itemTariff;
    @Column(name = "item_name")
    private String itemName;

    @OneToMany(mappedBy = "workPosition")
    private Set<WorkPositionReport> workPositionReports;

    public Set<WorkPositionReport> getWorkPositionReports() {
        return workPositionReports;
    }

    public void setWorkPositionReports(Set<WorkPositionReport> workPositionReports) {
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

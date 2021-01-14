package by.gstu.itp.palletprod.model;

import java.math.BigDecimal;
import java.util.Set;

public class WorkPosition {
    private String id;
    private String name;
    private BigDecimal itemTariff;
    private String itemName;

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

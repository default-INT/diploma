package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.model.report.DayStat;
import by.gstu.itp.palletprod.model.report.WorkItem;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "positions")
public class Position {
    public static Position of(PositionDto positionDto) {
        Position position = new Position();

        position.setId(positionDto.getId());
        position.setName(positionDto.getName());
        position.setItemName(positionDto.getItemName());
        position.setItemTariff(positionDto.getItemTariff());
        position.setDeleted(positionDto.isDelete());
        position.setPallet(positionDto.isPallet());
        position.setStorage(positionDto.isStorage());

        return position;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "item_tariff", nullable = false)
    private BigDecimal itemTariff;
    @Column(name = "item_name", nullable = false)
    private String itemName;
    @Column(nullable = false)
    private boolean pallet;
    @Column(nullable = false)
    private boolean storage;
    @Column(nullable = false)
    private boolean deleted;

    @OneToMany(mappedBy = "position")
    private List<WorkItem> workItems;

    @OneToMany(mappedBy = "position")
    private List<DayStat> dayStats;

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

    public boolean isPallet() {
        return pallet;
    }

    public void setPallet(boolean pallet) {
        this.pallet = pallet;
    }

    public boolean isStorage() {
        return storage;
    }

    public void setStorage(boolean storage) {
        this.storage = storage;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public List<WorkItem> getWorkItems() {
        return workItems;
    }

    public void setWorkItems(List<WorkItem> workItems) {
        this.workItems = workItems;
    }

    public List<DayStat> getDayStats() {
        return dayStats;
    }

    public void setDayStats(List<DayStat> dayStats) {
        this.dayStats = dayStats;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Position position = (Position) o;
        return pallet == position.pallet && storage == position.storage
                && name.equals(position.name)
                && itemTariff.equals(position.itemTariff)
                && itemName.equals(position.itemName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, itemTariff, itemName, pallet, storage);
    }
}

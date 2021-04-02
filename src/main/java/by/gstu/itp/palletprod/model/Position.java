package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.PositionDto;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

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
}

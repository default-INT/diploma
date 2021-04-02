package by.gstu.itp.palletprod.dto;

import by.gstu.itp.palletprod.model.Position;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
        setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility=JsonAutoDetect.Visibility.NONE)
public class PositionDto {
    public static PositionDto of(Position position) {
        PositionDto positionDto = new PositionDto();

        positionDto.setId(position.getId());
        positionDto.setName(position.getName());
        positionDto.setItemTariff(position.getItemTariff());
        positionDto.setItemName(position.getItemName());
        positionDto.setPallet(position.isPallet());
        positionDto.setStorage(position.isStorage());
        positionDto.setDelete(position.isDeleted());

        return positionDto;
    }

    private String id;
    @NotBlank
    @Size(min = 2, max = 30)
    private String name;
    @NotNull
    private BigDecimal itemTariff;
    @NotBlank
    @Size(min = 1, max = 50)
    private String itemName;
    private boolean isPallet;
    private boolean isStorage;
    private boolean isDelete;

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


    @JsonProperty("isPallet")
    public boolean isPallet() {
        return isPallet;
    }

    public void setPallet(boolean pallet) {
        isPallet = pallet;
    }


    @JsonProperty("isStorage")
    public boolean isStorage() {
        return isStorage;
    }

    public void setStorage(boolean storage) {
        isStorage = storage;
    }


    @JsonProperty("isDelete")
    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }
}

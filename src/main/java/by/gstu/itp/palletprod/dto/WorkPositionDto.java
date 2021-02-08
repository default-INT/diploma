package by.gstu.itp.palletprod.dto;

import by.gstu.itp.palletprod.model.WorkPosition;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class WorkPositionDto {
    public static WorkPositionDto of(WorkPosition workPosition) {
        WorkPositionDto workPositionDto = new WorkPositionDto();

        workPositionDto.setId(workPosition.getId());
        workPositionDto.setName(workPosition.getName());
        workPositionDto.setItemName(workPosition.getItemName());
        workPositionDto.setItemTariff(workPosition.getItemTariff());

        return workPositionDto;
    }

    private String id;
    @NotBlank
    @Size(min = 4, max = 200)
    private String name;
    @NotNull
    private BigDecimal itemTariff;
    @NotBlank
    @Size(min = 1, max = 50)
    private String itemName;

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

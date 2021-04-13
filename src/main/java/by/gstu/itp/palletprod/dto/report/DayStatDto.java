package by.gstu.itp.palletprod.dto.report;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.model.report.DayStat;

import java.math.BigDecimal;

public class DayStatDto {
    public static DayStatDto of(DayStat dayStat) {
        final DayStatDto dayStatDto = new DayStatDto();

        dayStatDto.setId(dayStat.getId());
        dayStatDto.setPositionId(dayStat.getPositionId());
        dayStatDto.setPosition(PositionDto.of(dayStat.getPosition()));
        dayStatDto.setTotalNum(dayStat.getTotalNum());
        dayStatDto.setTotalSalary(dayStat.getTotalSalary());

        return dayStatDto;
    }

    private String id;
    private String positionId;
    private PositionDto position;
    private int totalNum;
    private BigDecimal totalSalary;

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

    public int getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(int totalNum) {
        this.totalNum = totalNum;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }
}

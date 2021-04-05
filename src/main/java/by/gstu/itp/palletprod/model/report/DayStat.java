package by.gstu.itp.palletprod.model.report;

import by.gstu.itp.palletprod.model.Position;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "day_stats")
public class DayStat {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    @Column(name = "position_id", nullable = false, updatable = false, insertable = false)
    private String positionId;
    @Column(name = "total_num", nullable = false)
    private int totalNum;
    @Column(name = "total_salary", nullable = false)
    private BigDecimal totalSalary;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}

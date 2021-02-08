package by.gstu.itp.palletprod.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "work_position_reports")
public class WorkPositionReport {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "work_position_id", insertable = false, updatable = false)
    private String workPositionId;
    @Column(name = "report_id", insertable = false, updatable = false)
    private String reportId;
    @Column(name = "total_item_count")
    private int totalItemCount;
    @Column(name = "total_sum")
    private float totalSum;

    @ManyToOne
    @JoinColumn(name = "work_position_id")
    private WorkPosition workPosition;
    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWorkPositionId() {
        return workPositionId;
    }

    public void setWorkPositionId(String workPositionId) {
        this.workPositionId = workPositionId;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public int getTotalItemCount() {
        return totalItemCount;
    }

    public void setTotalItemCount(int totalItemCount) {
        this.totalItemCount = totalItemCount;
    }

    public float getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(float totalCoeffSum) {
        this.totalSum = totalCoeffSum;
    }

    public WorkPosition getWorkPosition() {
        return workPosition;
    }

    public void setWorkPosition(WorkPosition workPosition) {
        this.workPosition = workPosition;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }
}

package by.gstu.itp.palletprod.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "work_items")
public class WorkItem {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "employee_report_id", insertable = false, updatable = false)
    private String employeeReportId;
    @Column(name = "work_position_id", insertable = false, updatable = false)
    private String workPositionId;
    @Column(name = "item_count")
    private int itemCount;
    @Column(name = "item_coeff")
    private float itemCoeff;

    @ManyToOne
    @JoinColumn(name = "employee_report_id")
    private EmployeeReport employeeReport;
    @ManyToOne
    @JoinColumn(name = "work_position_id")
    private WorkPosition workPosition;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeReportId() {
        return employeeReportId;
    }

    public void setEmployeeReportId(String employeeReportId) {
        this.employeeReportId = employeeReportId;
    }

    public String getWorkPositionId() {
        return workPositionId;
    }

    public void setWorkPositionId(String workPositionId) {
        this.workPositionId = workPositionId;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public float getItemCoeff() {
        return itemCoeff;
    }

    public void setItemCoeff(float itemCoeff) {
        this.itemCoeff = itemCoeff;
    }

    public EmployeeReport getEmployeeReport() {
        return employeeReport;
    }

    public void setEmployeeReport(EmployeeReport employeeReport) {
        this.employeeReport = employeeReport;
    }

    public WorkPosition getWorkPosition() {
        return workPosition;
    }

    public void setWorkPosition(WorkPosition workPosition) {
        this.workPosition = workPosition;
    }
}

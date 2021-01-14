package by.gstu.itp.palletprod.model;

public class WorkItem {
    private String id;
    private String employeeReportId;
    private String workPositionId;
    private int itemCount;
    private float itemCoeff;

    private EmployeeReport employeeReport;
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

package by.gstu.itp.palletprod.model.report;

import by.gstu.itp.palletprod.dto.report.EmployeeItemDto;
import by.gstu.itp.palletprod.model.Employee;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "employee_items")
public class EmployeeItem {
    public static EmployeeItem of(final EmployeeItemDto employeeItemDto) {
        final EmployeeItem employeeItem = new EmployeeItem();

        employeeItem.setId(employeeItemDto.getId());
        employeeItem.setEmployeeId(employeeItemDto.getEmployeeId());
        employeeItem.setTotalSalary(employeeItemDto.getTotalSalary());

        employeeItem.setWorkItems(
                employeeItemDto.getWorkItems().stream().map(WorkItem::of)
                    .collect(Collectors.toList())
        );

        return employeeItem;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "employee_id", nullable = false, updatable = false, insertable = false)
    private String employeeId;
    @Column(name = "report_id", updatable = false, insertable = false)
    private String reportId;
    @Column(name = "total_salary", nullable = false)
    private BigDecimal totalSalary;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "employee_item_id")
    private List<WorkItem> workItems;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<WorkItem> getWorkItems() {
        return workItems;
    }

    public void setWorkItems(List<WorkItem> workItems) {
        this.workItems = workItems;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }
}

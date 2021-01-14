package by.gstu.itp.palletprod.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column
    private LocalDate date;

    @OneToMany(mappedBy = "report")
    private Set<EmployeeReport> employeeReports;
    @OneToMany(mappedBy = "report")
    private Set<WorkPositionReport> workPositionReports;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<EmployeeReport> getEmployeeReports() {
        return employeeReports;
    }

    public void setEmployeeReports(Set<EmployeeReport> employeeReports) {
        this.employeeReports = employeeReports;
    }

    public Set<WorkPositionReport> getWorkPositionReports() {
        return workPositionReports;
    }

    public void setWorkPositionReports(Set<WorkPositionReport> workPositionReports) {
        this.workPositionReports = workPositionReports;
    }
}

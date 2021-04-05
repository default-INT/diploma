package by.gstu.itp.palletprod.model.report;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(nullable = false)
    private LocalDate date;
    @Column(name = "total_salary", nullable = false)
    private BigDecimal totalSalary;

    @OneToMany(mappedBy = "report")
    private List<EmployeeItem> employeeItems;

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

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }

    public List<EmployeeItem> getEmployeeItems() {
        return employeeItems;
    }

    public void setEmployeeItems(List<EmployeeItem> employeeItems) {
        this.employeeItems = employeeItems;
    }
}

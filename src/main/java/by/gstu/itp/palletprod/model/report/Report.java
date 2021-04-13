package by.gstu.itp.palletprod.model.report;

import by.gstu.itp.palletprod.dto.report.ReportDto;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "reports")
public class Report {
    public static Report of(ReportDto reportDto) {
        final Report report = new Report();

        report.setId(reportDto.getId());
        report.setDate(reportDto.getDate());

        report.setEmployeeItems(
                reportDto.getEmployeeItems().stream().map(EmployeeItem::of)
                    .collect(Collectors.toList())
        );

        report.setTotalSalary(reportDto.getTotalSalary());

        return report;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(nullable = false)
    private LocalDate date;
    @Column(name = "total_salary", nullable = false)
    private BigDecimal totalSalary;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "report_id")
    private List<EmployeeItem> employeeItems;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "report_id")
    private List<DayStat> dayStats;

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

    public List<DayStat> getDayStats() {
        return dayStats;
    }

    public void setDayStats(List<DayStat> dayStats) {
        this.dayStats = dayStats;
    }
}

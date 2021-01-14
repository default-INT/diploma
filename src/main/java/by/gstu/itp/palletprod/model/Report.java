package by.gstu.itp.palletprod.model;

import java.time.LocalDate;
import java.util.Set;

public class Report {
    private String id;
    private LocalDate date;

    private Set<EmployeeReport> employeeReports;
    private Set<WorkPositionReport> workPositionReports;
}

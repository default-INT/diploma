package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "employees")
public class Employee {

    public static Employee of(EmployeeDto employeeDto) {
        Employee employee = new Employee();

        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setSecondName(employeeDto.getSecondName());
        employee.setLastName(employeeDto.getLastName());
        employee.setBirthdayYear(employeeDto.getBirthdayYear());

        return employee;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "second_name", nullable = false)
    private String secondName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(nullable = false)
    private int birthdayYear;
    //TODO: need add delete property (bool deleted)

    @OneToMany(mappedBy = "employee")
    private Set<EmployeeReport> employeeReports;

    public Set<EmployeeReport> getEmployeeReports() {
        return employeeReports;
    }

    public void setEmployeeReports(Set<EmployeeReport> employeeReports) {
        this.employeeReports = employeeReports;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getBirthdayYear() {
        return birthdayYear;
    }

    public void setBirthdayYear(int age) {
        this.birthdayYear = age;
    }
}

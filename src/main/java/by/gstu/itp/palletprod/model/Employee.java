package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

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
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setUserId(employeeDto.getUserId());
        employee.setFired(employeeDto.isFired());
        employee.setDeleted(employeeDto.isDeleted());

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
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    @Column(name = "user_id")
    private String userId;
    @Column(nullable = false)
    private int birthdayYear;
    @Column(nullable = false)
    private boolean fired = false;
    @Column(nullable = false)
    private boolean deleted = false;

    @OneToMany(mappedBy = "employee")
    private List<EmployeeItem> employeeItems;

    public List<EmployeeItem> getEmployeeItems() {
        return employeeItems;
    }

    public String getFullName() {
        return lastName + " " + firstName.charAt(0) + "." + secondName.charAt(0) + ".";
    }

    public void setEmployeeItems(List<EmployeeItem> employeeItems) {
        this.employeeItems = employeeItems;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isFired() {
        return fired;
    }

    public void setFired(boolean fired) {
        this.fired = fired;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return birthdayYear == employee.birthdayYear && id.equals(employee.id) && firstName.equals(employee.firstName) && secondName.equals(employee.secondName) && lastName.equals(employee.lastName) && phoneNumber.equals(employee.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, secondName, lastName, phoneNumber, birthdayYear);
    }
}

package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.dto.EmployeeDto;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

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
}

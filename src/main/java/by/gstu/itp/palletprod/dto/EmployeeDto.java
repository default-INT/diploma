package by.gstu.itp.palletprod.dto;

import by.gstu.itp.palletprod.model.Employee;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class EmployeeDto {

    public static EmployeeDto of(Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();

        employeeDto.setId(employee.getId());
        employeeDto.setFirstName(employee.getFirstName());
        employeeDto.setSecondName(employee.getSecondName());
        employeeDto.setLastName(employee.getLastName());
        employeeDto.setBirthdayYear(employee.getBirthdayYear());
        employeeDto.setPhoneNumber(employee.getPhoneNumber());
        employeeDto.setFired(employee.isFired());
        employeeDto.setDeleted(employee.isDeleted());

        return employeeDto;
    }

    private String id;
    @NotBlank
    @Size(min = 2, max = 30)
    private String firstName;
    @NotBlank
    @Size(min = 2, max = 30)
    private String secondName;
    @NotBlank
    @Size(min = 2, max = 30)
    private String lastName;
    @Min(1930)
    private int birthdayYear;
    @Size(min = 2, max = 30)
    private String phoneNumber;
    private boolean isFired;
    private boolean isDeleted;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonProperty("isDeleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    @JsonProperty("isFired")
    public boolean isFired() {
        return isFired;
    }

    public void setFired(boolean deleted) {
        this.isFired = deleted;
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

    public void setBirthdayYear(int birthdayYear) {
        this.birthdayYear = birthdayYear;
    }
}

package by.gstu.itp.palletprod.dto;

import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.user.User;

import java.util.Objects;

public class UserDto {
    public static UserDto of(final User user) {
        final UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setEmployeeId(user.getEmployeeId());
        if (Objects.isNull(user.getEmployee())) {
            return userDto;
        }
        userDto.setEmployee(EmployeeDto.of(user.getEmployee()));
        return userDto;
    }

    private String id;
    private String email;
    private String role;
    private String employeeId;
    private EmployeeDto employee;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public EmployeeDto getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDto employeeDto) {
        this.employee = employeeDto;
    }
}

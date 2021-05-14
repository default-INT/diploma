package by.gstu.itp.palletprod.model.user;

import by.gstu.itp.palletprod.model.Employee;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(unique = true)
    private String email;
    @Column(name = "employee_id")
    private String employeeId;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private boolean confirmed;
    @Column(length = 30)
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", updatable = false, insertable = false)
    private Employee employee;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

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

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}

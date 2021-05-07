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
    @Column
    private String email;
    @Column(name = "employee_id", updatable = false, insertable = false)
    private String employeeId;
    @Column(length = 30)
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

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

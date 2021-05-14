package by.gstu.itp.palletprod.model;

import javax.persistence.*;

@Entity
@Table(name = "temp_users_table")
public class TempUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String login;
    private String password;

    @Column(unique = true)
    private String activationUUID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getActivationUUID() {
        return activationUUID;
    }

    public void setActivationUUID(String activationUUID) {
        this.activationUUID = activationUUID;
    }
}

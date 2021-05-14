package by.gstu.itp.palletprod.model;

import by.gstu.itp.palletprod.model.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "refresh_jwt_tokens")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(length = 300)
    private String refreshJws;
    @NotBlank
    @Column(length = 300)
    private String accessJws;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Token() {
    }

    public Token(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefreshJws() {
        return refreshJws;
    }

    public void setRefreshJws(String refreshJws) {
        this.refreshJws = refreshJws;
    }

    public String getAccessJws() {
        return accessJws;
    }

    public void setAccessJws(String accessJws) {
        this.accessJws = accessJws;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

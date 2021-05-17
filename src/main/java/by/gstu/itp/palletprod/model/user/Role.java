package by.gstu.itp.palletprod.model.user;

public enum Role {
    ADMIN, EMPLOYEE;

    public String getWithPrefix() {
        return "ROLE_" + name();
    }
}

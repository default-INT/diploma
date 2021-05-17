import {ROLES} from "../constants";

export default class User {
    /**
     *
     * @param email {string}
     * @param role {string}
     * @param employeeId {string}
     * @param employee {object}
     */
    constructor(email, role, employeeId, employee) {
        this.email = email;
        this.role = role;
        this.employeeId = employeeId;
        this.employee = employee;
    }

    isAdmin = () => {
        return this.role === ROLES.ADMIN;
    }

    isEmployee = () => {
        return this.role === ROLES.EMPLOYEE;
    }

    static of(options) {
        return new User(options.email, options.role, options.employeeId, options.employee);
    }
}
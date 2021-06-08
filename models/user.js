import {ROLES} from "../constants";
import Employee from "./employee";

const ROLE_NAMES = {
    ['ADMIN']: 'Администратор',
    ['EMPLOYEE']: 'Сотрудник'
}

/**
 * Класс описывает пользователя системы.
 */
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

    /**
     * Проверяет, является ли пользователь администратором.
     *
     * @returns {boolean}
     */
    isAdmin = () => {
        return this.role === ROLES.ADMIN;
    }

    /**
     * Проверяет, является ли пользователь сотрудником.
     *
     * @returns {boolean}
     */
    isEmployee = () => {
        return this.role === ROLES.EMPLOYEE;
    }

    /**
     * Возвращает роль пользователя.
     *
     * @returns {*}
     */
    getRoleName = () => {
        return ROLE_NAMES[this.role];
    }

    static of(options) {
        return new User(options.email, options.role, options.employeeId, options.employee && Employee.of(options.employee));
    }
}
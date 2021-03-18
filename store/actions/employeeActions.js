import {Employee} from "../../models"
import {EMPLOYEES} from "../../data/dummy-data"
import {EMPLOYEE_TYPES} from "../../constants/types"
import {employeeReducer} from "../reducers/employeeReducer";


export const fetchEmployees = () => {
    return {
        action: EMPLOYEE_TYPES.FETCH_ALL,
        payload: EMPLOYEES
    }
}

export const addEmployees = employee => {
    return {
        action: EMPLOYEE_TYPES.ADD_EMPLOYEE,
        payload: new Employee(
            new Date().toISOString(),
            employee.lastName,
            employee.firstName,
            employee.secondName,
            employee.birthdayYear,
            null
        )
    }
}

export const deleteEmployee = employeeId => {
    return {
        action: EMPLOYEE_TYPES.DELETE_EMPLOYEE,
        payload: employeeId
    }
}

export const updateEmployee = employee => {
    return {
        action: EMPLOYEE_TYPES.UPDATE_EMPLOYEE,
        payload: employee
    }
}
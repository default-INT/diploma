import {Employee} from "../../models"
import {EMPLOYEES} from "../../data/dummy-data"
import {EMPLOYEE_TYPES} from "../../constants/types"
import {employeeReducer} from "../reducers/employeeReducer";


export const fetchEmployees = () => {
    return {
        type: EMPLOYEE_TYPES.FETCH_ALL,
        payload: EMPLOYEES
    }
}

export const addEmployees = employee => {
    return {
        type: EMPLOYEE_TYPES.ADD_EMPLOYEE,
        payload: new Employee(
            new Date().toISOString(),
            employee.lastName,
            employee.firstName,
            employee.secondName,
            employee.birthdayYear,
            employee.phoneNumber,
            null
        )
    }
}

export const deleteEmployee = employeeId => {
    return {
        type: EMPLOYEE_TYPES.DELETE_EMPLOYEE,
        payload: employeeId
    }
}

export const updateEmployee = employee => {
    return {
        type: EMPLOYEE_TYPES.UPDATE_EMPLOYEE,
        payload: new Employee(
            employee.id,
            employee.lastName,
            employee.firstName,
            employee.secondName,
            employee.birthdayYear,
            employee.phoneNumber,
            null
        )
    }
}
import {EMPLOYEES} from "../../data/dummy-data"
import {EMPLOYEE_TYPES} from "../../constants/types"

const initialState = {
    employees: EMPLOYEES
}

const handlers = {
    [EMPLOYEE_TYPES.FETCH_ALL]: (state, {payload}) => ({
        ...state,
        employees: payload
    }),
    [EMPLOYEE_TYPES.ADD_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.employees.concat(payload).sort((a, b) => a.id > b.id ? 1 : -1)
    }),
    [EMPLOYEE_TYPES.UPDATE_EMPLOYEE]: (state, {payload}) => {
        const employeeIdx = state.employees.findIndex(employee => employee.id === payload.id);
        const updatedEmployees = [...state.employees]
        updatedEmployees[employeeIdx] = payload
        return {
            ...state,
            employees: updatedEmployees
        }
    },
    [EMPLOYEE_TYPES.DELETE_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.employees.filter(employee => employee.id !== payload)
    }),
    DEFAULT: state => state
}

export const employeeReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
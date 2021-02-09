import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES, UPDATE_EMPLOYEE} from "../../types";


const initialState = {
    employees: []
}

const handlers = {
    [FETCH_EMPLOYEES]: (state, {payload}) => ({
        ...state,
        employees: payload
    }),
    [CREATE_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.concat([payload])
    }),
    [UPDATE_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.filter(employee => employee.id !== payload.id).concat([payload])
    }),
    [DELETE_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.filter(employee => employee.id !== payload.id)
    }),
    DEFAULT: state => state
}

export const employeeReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
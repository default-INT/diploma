/**
 * Начальное состояние.
 *
 * @type {{employees: [], loading: boolean, error: null}}
 */
import {EMPLOYEE_TYPES} from "../../constants/types";

const initialState = {
    employees: [],
    loading: false,
    error: null
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
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
        const updatedEmployees = [...state.employees];
        updatedEmployees[employeeIdx] = payload;
        return {
            ...state,
            employees: updatedEmployees
        }
    },
    [EMPLOYEE_TYPES.FIRE_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        employees: state.employees.filter(employee => employee.id !== payload)
    }),
    [EMPLOYEE_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [EMPLOYEE_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [EMPLOYEE_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
    DEFAULT: state => state
}

/**
 * Функция редюсер.
 *
 * @param state {object}
 * @param action {object}
 * @returns {*}
 */
export const employeeReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
/**
 * В данном файле описаны "reducer" для изменения состояния о производственной деятельносьти сотрудника.
 */
import {USER_TYPES} from "../../constants/types";

/**
 *
 * @type {{totalMonthSalary: number, userReports: [], avgMonthSalary: number}}
 */
const initialState = {
    totalMonthSalary: 0,
    avgMonthSalary: 0,
    userReports: [],
    userStatistic: null
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [USER_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [USER_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [USER_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
    [USER_TYPES.SET_AVG_MONTH_SALARY]: (state, {payload}) => ({
        ...state,
        avgMonthSalary: payload
    }),
    [USER_TYPES.SET_TOTAL_MONTH_SALARY]: (state, {payload}) => ({
        ...state,
        totalMonthSalary: payload
    }),
    [USER_TYPES.SET_USER_REPORTS]: (state, {payload}) => ({
        ...state,
        userReports: payload
    }),
    [USER_TYPES.SET_USER_STATISTICS]: (state, {payload}) => ({
        ...state,
        userStatistic: payload
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
export const userReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
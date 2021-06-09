/**
 * В данном файле описаны "reducer" для изменения состояния о бизнес-процессах компании в глобальном STATE.
 */
import {COMPANY_TYPES} from "../../constants/types";

/**
 * Начальное состояние.
 *
 * @type {{income: DataItem, avgSalary: DataItem, countEmployee: DataItem}}
 */
const initialState = {
    countEmployee: 0,
    avgSalary: 0,
    income: 0
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [COMPANY_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [COMPANY_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [COMPANY_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
    [COMPANY_TYPES.SET_AVG_SALARY_ON_DAY]: (state, {payload}) => ({
        ...state,
        avgSalary: payload
    }),
    [COMPANY_TYPES.SET_COUNT_EMPLOYEES]: (state, {payload}) => ({
        ...state,
        countEmployee: payload
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
export const companyReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
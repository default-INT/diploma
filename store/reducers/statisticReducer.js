/**
 * В данном файле описан "reducer" для изменения состояния об статистике в глобальном STATE.
 */
import {STAT_TYPES} from "../../constants/types";

/**
 * Начальное состояние.
 *
 * @type {{employeesStatistic: null}}
 */
const initialState = {
    employeesStatistic: null
};

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [STAT_TYPES.FETCH_EMPLOYEE_STAT]: (state, {payload}) => ({
        ...state,
        employeesStatistic: payload
    }),
    [STAT_TYPES.FETCH_STAT_BY_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        statisticByEmployee: payload
    }),
    DEFAULT: state => state
};

/**
 * Функция редюсер.
 *
 * @param state {object}
 * @param action {object}
 * @returns {*}
 */
export const statisticReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
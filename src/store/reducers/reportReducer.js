/**
 * В данном файле описан "reducer" для изменения состояния о отчётах.
 */
import {REPORT_TYPES} from "../../constants/types";


/**
 *
 * @type {{monthlyReports: *[], loading: boolean, error: null}}
 */
const initialState = {
    monthlyReports: [],
    isLoaded: false,
    error: null
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [REPORT_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [REPORT_TYPES.SET_MONTHLY_REPORTS]: (state, {payload}) => ({
        ...state,
        monthlyReports: payload
    }),
    [REPORT_TYPES.START_LOADING]: (state) => ({
        ...state,
        isLoaded: false
    }),
    [REPORT_TYPES.END_LOADING]: (state) => ({
        ...state,
        isLoaded: true
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
export const reportReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
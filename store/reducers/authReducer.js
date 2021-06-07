/**
 * В данном файле описаны "reducer" для изменения состояния о авторизации в глобальном STATE.
 */
import {AUTH_TYPES} from "../../constants/types";

/**
 * Начальное состояние.
 *
 * @type {{didTryAutoLogin: boolean, authUser: null, accessToken: null, loading: boolean, refreshToken: null}}
 */
const initialState = {
    authUser: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    didTryAutoLogin: false,
    loading: false
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [AUTH_TYPES.SET_USER]: (state, {payload}) => ({
        ...state,
        authUser: payload,
        isAuth: true
    }),
    [AUTH_TYPES.SET_ACCESS_TOKEN]: (state, {payload}) => ({
        ...state,
        accessToken: payload
    }),
    [AUTH_TYPES.SET_REFRESH_TOKEN]: (state, {payload}) => ({
        ...state,
        refreshToken: payload
    }),
    [AUTH_TYPES.TRY_AUTO_LOGIN]: state => ({
        ...state,
        didTryAutoLogin: true
    }),
    [AUTH_TYPES.START_LOADING]: state => ({
        ...state,
        loading: true
    }),
    [AUTH_TYPES.END_LOADING]: state => ({
        ...state,
        loading: false
    }),
    [AUTH_TYPES.LOG_OUT]: state => ({
        ...state,
        authUser: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false
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
export const authReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
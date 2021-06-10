/**
 * В данном файле описан "reducer" для изменения состояния о складе в глобальном STATE.
 */
import {STORAGE_TYPES} from "../../constants/types";


/**
 * Начальное состояние.
 *
 * @type {{actualStorage: [], unloadingEvents: []}}
 */
const initialState = {
    actualStorage: [],
    unloadingEvents: [],
    isLoadedStorage: false,
    isLoadedEvents: false
};

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {
    [STORAGE_TYPES.FETCH_ACTUAL_STORAGE]: (state, {payload}) => ({
        ...state,
        actualStorage: payload
    }),
    [STORAGE_TYPES.FETCH_UNLOADING_EVENTS]: (state, {payload}) => ({
        ...state,
        unloadingEvents: payload
    }),
    [STORAGE_TYPES.ADD_UNLOADING_EVENT]: (state, {payload}) => ({
        ...state,
        unloadingEvents: state.unloadingEvents.concat(payload).sort((u1, u2) => u1 - u2)
    }),
    [STORAGE_TYPES.DELETE_UNLOADING_EVENT]: (state, {payload}) => ({
        ...state,
        unloadingEvents: state.unloadingEvents.filter(e => e.id !== payload)
    }),
    [STORAGE_TYPES.START_LOADING]: state => ({
        ...state,
        isLoadedStorage: false
    }),
    [STORAGE_TYPES.END_LOADING]: state => ({
        ...state,
        isLoadedStorage: true
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
export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
};
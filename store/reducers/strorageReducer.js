import {STORAGE_TYPES} from "../../constants/types";


const initialState = {
    actualStorage: [],
    unloadingEvents: []
}

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
    DEFAULT: state => state
}

export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
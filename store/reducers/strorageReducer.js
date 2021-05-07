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
    DEFAULT: state => state
}

export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
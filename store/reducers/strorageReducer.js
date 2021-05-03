import {STORAGE_TYPES} from "../../constants/types";


const initialState = {
    actualStorage: []
}

const handlers = {
    [STORAGE_TYPES.FETCH_ACTUAL_STORAGE]: (state, {payload}) => ({
        ...state,
        actualStorage: payload
    }),
    DEFAULT: state => state
}

export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
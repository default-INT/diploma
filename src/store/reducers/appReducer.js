import {HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from "../../types";

const initialState = {
    loading: false,
    alert: null
}

const handlers = {
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    [HIDE_LOADER]: (state) => ({...state, loading: false}),
    [SHOW_ALERT]: (state, {payload}) => ({...state, alert: payload}),
    [HIDE_ALERT]: (state) => ({...state, alert: null}),
    DEFAULT: state => state
}

export default (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
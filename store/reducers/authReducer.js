import {AUTH_TYPES} from "../../constants/types";

const initialState = {
    authUser: null,
    accessToken: null,
    refreshToken: null
}


const handlers = {
    [AUTH_TYPES.SET_USER]: (state, {payload}) => ({
        ...state,
        authUser: payload
    }),
    [AUTH_TYPES.SET_ACCESS_TOKEN]: (state, {payload}) => ({
        ...state,
        accessToken: payload
    }),
    [AUTH_TYPES.SET_REFRESH_TOKEN]: (state, {payload}) => ({
        ...state,
        refreshToken: payload
    }),
    DEFAULT: state => state
}

export const authReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
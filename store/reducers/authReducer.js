import {AUTH_TYPES} from "../../constants/types";

const initialState = {
    authUser: null,
    accessToken: null,
    refreshToken: null,
    didTryAutoLogin: false,
    loading: false
}


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
    [AUTH_TYPES.TRY_AUTO_LOGIN]: (state) => ({
        ...state,
        didTryAutoLogin: true
    }),
    DEFAULT: state => state
}

export const authReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
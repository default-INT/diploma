import {AUTH_TYPES} from "../../constants/types";

export const setUser = user => ({
    type: AUTH_TYPES.SET_USER,
    payload: user
});
export const fetchUser = () => ({
    type: AUTH_TYPES.SET_USER
});

export const startLoading = () => ({
    type: AUTH_TYPES.START_LOADING
});

export const endLoading = () => ({
    type: AUTH_TYPES.END_LOADING
});

export const tryAutoLogin = () => ({
    type: AUTH_TYPES.TRY_AUTO_LOGIN
});

export const setAccessToken = accessToken => ({
    type: AUTH_TYPES.SET_ACCESS_TOKEN,
    payload: accessToken
});

export const setRefreshToken = refreshToken => ({
    type: AUTH_TYPES.SET_REFRESH_TOKEN,
    payload: refreshToken
});

export const setError = error => ({
    type: AUTH_TYPES.SET_ERROR,
    payload: error
})
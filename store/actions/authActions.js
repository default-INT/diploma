import axios from "axios";

import {AUTH_TYPES} from "../../constants/types";
import User from "../../models/user";
import {getResponseErrorText, readTokens, setTokenHeader, writeTokens} from "../../utils";

const saveTokens = async (accessToken, refreshToken) => {
    try {
        await writeTokens(accessToken, refreshToken);
        setTokenHeader(accessToken);
    } catch (err) {
        console.warn(err.message);
        throw err;
    }
}

const getProfile = async () => {
    const response = await axios.get(`/api/auth/profile`);
    if (response.status !== 200) {
        throw new Error(getResponseErrorText(response, 'Не удалось получить пользователя'));
    }
    const user = response.data;
    return User.of(user);
}

export const loadTokens = () => {
    return async dispatch => {
        try {
            const {accessToken, refreshToken} = await readTokens();

            if (!accessToken || !refreshToken) {
                console.log('Tokens is null');
                dispatch({type: AUTH_TYPES.TRY_AUTO_LOGIN});
                return;
            }
            setTokenHeader(accessToken);

            dispatch({type: AUTH_TYPES.SET_ACCESS_TOKEN, payload: accessToken});
            dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: refreshToken});
            dispatch({type: AUTH_TYPES.SET_USER, payload: await getProfile()});

            dispatch({type: AUTH_TYPES.TRY_AUTO_LOGIN});
        } catch (err) {
            console.warn(err.message)
            dispatch({type: AUTH_TYPES.TRY_AUTO_LOGIN});
            throw err;
        }
    }
}

export const logInUser = (email, password) => {
    return async dispatch => {
        const response = await axios.post(`/api/auth/login`, {
            email, password
        });
        if (response.status !== 200) {
            throw new Error(getResponseErrorText(response, 'Не удалось авторизоваться'));
        }

        const tokens = response.data;

        await saveTokens(tokens.access, tokens.refresh);
        dispatch({type: AUTH_TYPES.SET_ACCESS_TOKEN, payload: tokens.access});
        dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: tokens.refresh});
        dispatch({type: AUTH_TYPES.SET_USER, payload: await getProfile()});
    }
}
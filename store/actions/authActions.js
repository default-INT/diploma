import AsyncStorage from "@react-native-async-storage/async-storage";

import {AUTH_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";
import User from "../../models/user";

const ACCESS_TOKEN_KEY = "@access_token";
const REFRESH_TOKEN_KEY = "@refresh_token";

const saveTokens = async (accessToken, refreshToken) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (err) {
        console.warn(err.message);
        throw err;
    }
}

const getProfile = async (accessToken, refreshToken) => {
    const response = await fetch(`${SERVER_URL}/api/auth/profile`, {
        headers: {
            'Authorization': accessToken
        }
    });
    if (!response.ok) {
        throw new Error('Не удалось получить пользователя. Status: ' + response.status);
    }
    const user = await response.json();
    return User.of(user);
}

export const loadTokens = () => {
    return async dispatch => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            if (!accessToken || !refreshToken) {
                console.log('Tokens is null');
                dispatch({type: AUTH_TYPES.TRY_AUTO_LOGIN});
                return;
            }
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
        const response = await fetch(`${SERVER_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        });

        if (!response.ok) {
            throw new Error('Не удалось авторизоваться. Status: ' + response.status);
        }

        const tokens = await response.json();

        saveTokens(tokens.access, tokens.refresh);
        dispatch({type: AUTH_TYPES.SET_ACCESS_TOKEN, payload: tokens.access});
        dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: tokens.refresh});
        dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: await getProfile()});
    }
}
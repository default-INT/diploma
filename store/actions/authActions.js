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

export const loadTokens = () => {
    return async dispatch => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            dispatch({type: AUTH_TYPES.SET_ACCESS_TOKEN, payload: accessToken});
            dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: refreshToken});
        } catch (err) {
            console.warn(err.message)
            throw err;
        }
    }
}

export const logInUser = (email, password) => {
    return async dispatch => {
        const response = fetch(`${SERVER_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Не удалось авторизоваться. Status: ' + response.status);
        }

        const {tokens, ...user} = await response.json();

        saveTokens(tokens.access, tokens.refresh);
        dispatch({type: AUTH_TYPES.SET_ACCESS_TOKEN, payload: tokens.access});
        dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: tokens.refresh});
        dispatch({type: AUTH_TYPES.SET_REFRESH_TOKEN, payload: User.of(user)});
    }
}
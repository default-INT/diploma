/**
 * В данном файле описаны "actions" для управления авторизацией пользовтеля.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {AUTH_TYPES} from "../../constants/types";
import User from "../../models/user";
import {deleteTokens, getResponseErrorText, readTokens, setTokenHeader, writeTokens} from "../../utils";


/**
 * Функция сохраняющая токены и конфигурирующая Axios, для подстановки токенов в заголовок запроса.
 *
 * @param accessToken
 * @param refreshToken
 * @returns {Promise<void>}
 */
const saveTokens = async (accessToken, refreshToken) => {
    try {
        await writeTokens(accessToken, refreshToken);
        setTokenHeader(accessToken);
    } catch (err) {
        console.warn(err.message);
        throw err;
    }
}

/**
 * Функция получающая данные о пользователе с HTTP-сервера.
 *
 * @returns {Promise<User>}
 */
const getProfile = async () => {
    const response = await axios.get(`/api/auth/profile`);
    if (response.status !== 200) {
        throw new Error(getResponseErrorText(response, 'Не удалось получить пользователя'));
    }
    const user = response.data;
    return User.of(user);
}

/**
 * Функция загружающая токены из памяти системы.
 *
 * @returns {function(*): Promise<undefined>}
 */
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
            console.log(err.message)
            dispatch({type: AUTH_TYPES.TRY_AUTO_LOGIN});
            // throw err;
        }
    }
}

/**
 * Функция производящая авторизацию пользователя на HTTP-сервере.
 *
 * @param email {string}
 * @param password {string}
 * @returns {function(*): Promise<void>}
 */
export const logInUser = (email, password) => {
    return async dispatch => {
        try {
            dispatch({type: AUTH_TYPES.START_LOADING});
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
            dispatch({type: AUTH_TYPES.END_LOADING});
        } catch (e) {
            dispatch({type: AUTH_TYPES.END_LOADING});
            throw e;
        }

    }
}

export const logOut = () => {
    return async dispatch => {
        try {
            await deleteTokens();
            dispatch({type: AUTH_TYPES.LOG_OUT});
        } catch (err) {
            console.error(err.message);
        }
    }
}
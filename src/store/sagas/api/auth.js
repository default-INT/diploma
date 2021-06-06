import axios from "axios";
import {setTokenHeader} from "../../../util/request-config";

const ACCESS_TOKEN = "@access_token";
const REFRESH_TOKEN = "@REFRESH_token";

export const getProfile = () => axios.get(`/api/auth/profile`);

export const saveTokens = (accessToken, refreshToken) => {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setTokenHeader(accessToken);
}

export const loadTokens = () => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN);
    
    return {
        accessToken, refreshToken
    }
}

export const logIn = (email, password) => (
    axios.post(`/api/auth/login`, {
        email, password
    })
);
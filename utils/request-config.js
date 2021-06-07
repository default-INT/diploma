import axios from "axios";
import {SERVER_URL} from "../constants";

export const initAxios = () => {
    axios.defaults.baseURL = SERVER_URL;
}

export const setTokenHeader = accessToken => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    // TODO: use axios.interceptors.request or response for refresh tokens!
    // axios.interceptors.response.use(req => req, error => {
    //     console.log(error)
    // });
}

export const clearTokenHeader = () => {
    axios.defaults.headers['Authorization'] = null;
}

export const getResponseErrorText = (response, text) => {
    return `${text}. Status: ${response.status} ${response.statusText}`;
}
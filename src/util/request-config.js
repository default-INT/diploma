import axios from "axios";

import {SERVER_URL} from "../constants";


export const initAxios = () => {
    axios.defaults.baseURL = SERVER_URL;
}

export const setTokenHeader = accessToken => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
}

export const getResponseErrorText = (response, text) => {
    return `${text}. Status: ${response.status} ${response.statusText}`;
}
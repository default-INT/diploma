import axios from "axios";

import {SERVER_URL} from "../constants";


export const initAxios = () => {
    axios.defaults.baseURL = SERVER_URL;
    axios.interceptors.response.use(response => {
        if (response.status !== 200) {
            const message =`STATUS TEXT: ${response.statusText}; STATUS ${response.status}; DATA: ${response.data}`;
            console.error(message);
            alert(message);
            // throw ??
        }
        return response;
    });
}

export const setTokenHeader = accessToken => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
}

export const getResponseErrorText = (response, text) => {
    return `${text}. Status: ${response.status} ${response.statusText}`;
}
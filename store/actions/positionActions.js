/**
 * В данном файле описаны "actions" для управления данными о тарифах.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {POSITION_TYPES} from "../../constants/types";
import {Position} from "../../models";
import {getResponseErrorText} from "../../utils";


/**
 * Получает данные о всех тарифах с HTTP-сервера.
 *
 * @returns {function(*): Promise<undefined>}
 */
export const fetchPosition = () => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.get(`/positions`);
            if (response.status !== 200) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось получить данные о должностях')
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const positions = response.data;
            dispatch({
                type: POSITION_TYPES.FETCH_ALL,
                payload: positions.map(position => Position.of(position))
            });
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}

/**
 * Отправляет POST запрос на HTTP-сервер для добавление данных о новом тарифе.
 *
 * @param position {object}
 * @returns {function(*): Promise<undefined>}
 */
export const addPosition = position => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.post(`/positions`, position);
            if (response.status !== 200) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось добавить новый тариф')
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const newPosition = response.data;
            dispatch({
                type: POSITION_TYPES.ADD_POSITION,
                payload: Position.of(newPosition)
            });
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}

/**
 * Отправляет PUT-запрос на HTTP-сервер с обновлёнными данными о тарифе.
 * В ответ получает обновлённый тариф.
 *
 * @param position
 * @returns {function(*): Promise<undefined>}
 */
export const updatePosition = position => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.put(`/positions`, position);
            if (response.status !== 200) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось обновить данные о тарифе')
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const updatePosition = response.data;
            dispatch({
                type: POSITION_TYPES.UPDATE_POSITION,
                payload: {
                    position: Position.of(updatePosition),
                    oldId: position.id
                }
            });
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}

/**
 * Отправлеят DELETE-запрос на HTTP с ID тарифа в URI-адрессе для удаления данных о тарифе.
 *
 * @param positionId
 * @returns {function(*): Promise<undefined>}
 */
export const deletePosition = positionId => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.delete(`/positions/` + positionId);
            if (response.status !== 200) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось удалить тариф')
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const answer = response.data;
            if (answer) {
                dispatch({
                    type: POSITION_TYPES.DELETE_POSITION,
                    payload: positionId
                });
            } else {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось удалить тариф. Status: ' + response.status
                });
            }
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}
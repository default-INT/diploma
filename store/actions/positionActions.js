import {POSITION_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";
import {Position} from "../../models";


export const fetchPosition = () => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/positions`);
            if (!response.ok) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные о должностях. Status: ' + response.status
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const positions = await response.json();
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

export const addPosition = position => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/positions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(position)
            });
            if (!response.ok) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось добавить новый тариф. Status: ' + response.status
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const newPosition = await response.json();
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

export const updatePosition = position => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/positions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(position)
            });
            if (!response.ok) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось обновить данные о тарифе. Status: ' + response.status
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const updatePosition = await response.json();
            dispatch({
                type: POSITION_TYPES.UPDATE_POSITION,
                payload: Position.of(updatePosition)
            });
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}

export const deletePosition = positionId => {
    return async dispatch => {
        dispatch({type: POSITION_TYPES.START_LOADING});
        dispatch({type: POSITION_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/positions`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: positionId
                })
            });
            if (!response.ok) {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось удалить тариф. Status: ' + response.status
                });
                dispatch({type: POSITION_TYPES.END_LOADING});
                return;
            }
            const answer = await response.json();
            if (answer) {
                dispatch({
                    type: POSITION_TYPES.DELETE_POSITION,
                    payload: positionId
                });
            }
        } catch (err) {
            dispatch({type: POSITION_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: POSITION_TYPES.END_LOADING});
    }
}
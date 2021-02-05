import {hideLoader, showAlert, showLoader} from "./appActions";
import {CREATE_POSITION, DELETE_POSITION, FETCH_POSITIONS, UPDATE_POSITION} from "../../types";

const url = process.env.SERVER_URL
//TODO: wrap fetch or change to axios

export function createPosition(position) {
    return async dispatch => {
        try {
            const response = await fetch(url + '/positions', {
                method: 'POST',
                body: JSON.stringify(position)
            })
            const newPosition = response.json()
            dispatch({ type: CREATE_POSITION, payload: newPosition })
        } catch (e) {
            dispatch(showAlert('Не удалось добавить данные. Ошибка: '
                + e.getMessage()))
        }
    }
}

export function updatePosition(position) {
    return async dispatch => {
        try {
            const response = await fetch(url + '/positions', {
                method: 'PUT',
                body: JSON.stringify(position)
            })
            if (!response.ok) {
                throw new Error(await response.error())
            }
            const updatePosition = await response.json()
            dispatch({ type: UPDATE_POSITION, payload: updatePosition })
        } catch (e) {
            dispatch(showAlert('Не удалось удалить данные. Ошибка: '
                + e.getMessage()))
        }
    }
}

export function deletePosition(position) {
    return async dispatch => {
        try {
            const response = await fetch(url + '/positions', {
                method: 'DELETE',
                body: JSON.stringify(position)
            })
            if (!response.ok) {
                throw new Error(await response.error())
            }
            dispatch({ type: DELETE_POSITION, payload: position })
        } catch (e) {
            dispatch(showAlert('Не удалось удалить данные. Ошибка: '
                + e.getMessage()))
        }
    }
}

export function fetchPositions() {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await fetch(url + '/positions')
            const positions = await response.json()
            dispatch({ type: FETCH_POSITIONS, payload: positions})
            dispatch(hideLoader())
        } catch (e) {
            dispatch(showAlert('Не удалось загрузить данные с сервера. Ошибка: '
                + e.getMessage()))
        }
    }
}
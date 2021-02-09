import {hideLoader, showAlert, showLoader} from "./appActions";
import {CREATE_POSITION, DELETE_POSITION, FETCH_POSITIONS, SERVER_URL, UPDATE_POSITION} from "../../types";
import {api} from "../api";


//TODO: wrap fetch or change to axios
export function createPosition(position) {
    return async dispatch => {
        try {
            const response = await api.post(SERVER_URL + '/work-positions', {
                body: JSON.stringify(position)
            })
            const newPosition = await response.json()
            dispatch({ type: CREATE_POSITION, payload: newPosition })
        } catch (e) {
            dispatch(showAlert('Не удалось добавить данные. Ошибка: '
                + e))
        }
    }
}

export function updatePosition(position) {
    return async dispatch => {
        try {
            const response = await api.put(SERVER_URL + '/work-positions', {
                body: JSON.stringify(position)
            })
            if (!response.ok) throw new Error(response.response.statusText)
            const updatePosition = await response.json()
            dispatch({ type: UPDATE_POSITION, payload: updatePosition })
        } catch (e) {
            dispatch(showAlert('Не удалось обновить данные. Ошибка: '
                + e))
        }
    }
}

export function deletePosition(position) {
    return async dispatch => {
        try {
            const response = await api.delete(SERVER_URL + '/work-positions', {
                body: JSON.stringify(position)
            })
            if (!response.ok) {
                throw new Error(response.response.statusText)
            }
            dispatch({ type: DELETE_POSITION, payload: position })
        } catch (e) {
            dispatch(showAlert('Не удалось удалить данные. Ошибка: '
                + e))
        }
    }
}

export function fetchPositions() {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await api.get(SERVER_URL + '/work-positions')
            const positions = await response.json()
            dispatch({ type: FETCH_POSITIONS, payload: positions})
            dispatch(hideLoader())
        } catch (e) {
            console.error(e)
            dispatch(showAlert('Не удалось загрузить данные с сервера. Ошибка: '
                + e))
        }
    }
}
import {hideLoader, showAlert, showLoader} from "./appActions";
import {CREATE_POSITION, DELETE_POSITION, FETCH_POSITIONS, UPDATE_POSITION} from "../../types";
import {api} from "../api";

const url = 'http://127.0.0.1:8080'


//TODO: wrap fetch or change to axios
export function createPosition(position) {
    return async dispatch => {
        try {
            const response = await api.post(url + '/work-positions', {
                body: JSON.stringify(position)
            })
            const newPosition = await response.json()
            dispatch({ type: CREATE_POSITION, payload: newPosition })
        } catch (e) {
            dispatch(showAlert('Не удалось добавить данные. Ошибка: '
                + e))
            throw e
        }
    }
}

export function updatePosition(position) {
    return async dispatch => {
        try {
            const response = await api.put(url + '/work-positions', {
                body: JSON.stringify(position)
            })
            if (!response.ok) throw new Error(response.status)
            const updatePosition = await response.json()
            dispatch({ type: UPDATE_POSITION, payload: updatePosition })
        } catch (e) {
            dispatch(showAlert('Не удалось удалить данные. Ошибка: '
                + e))
        }
    }
}

export function deletePosition(position) {
    return async dispatch => {
        try {
            const response = await api.delete(url + '/work-positions', {
                body: JSON.stringify(position)
            })
            if (!response.ok) {
                throw new Error(response.status)
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
            const response = await api.get(url + '/work-positions')
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
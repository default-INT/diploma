import {HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from "../../types";

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    console.log(text)
    alert(text)
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        })
    }
}

export function showFetchError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось загрузить данные с сервера. Ошибка: ' + text))
    }
}

export function showCreateError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось добавить данные. Ошибка: ' + text))
    }
}

export function showUpdateError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось обновить данные. Ошибка: ' + text))
    }
}

export function showDeleteError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось удалить данные. Ошибка: ' + text))
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}
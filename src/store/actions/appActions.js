import {HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from "../../types";

/**
 * @deprecated
 * @returns {{type: string}}
 */
export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

/**
 * @deprecated
 * @returns {{type: string}}
 */
export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

/**
 * @deprecated
 * @param text
 * @returns {(function(*): void)|*}
 */
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

/**
 * @deprecated
 * @param text
 * @returns {(function(*): void)|*}
 */
export function showFetchError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось загрузить данные с сервера. Ошибка: ' + text))
    }
}


/**
 * @deprecated
 * @param text
 * @returns {(function(*): void)|*}
 */
export function showCreateError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось добавить данные. Ошибка: ' + text))
    }
}

/**
 * @deprecated
 * @param text
 * @returns {(function(*): void)|*}
 */
export function showUpdateError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось обновить данные. Ошибка: ' + text))
    }
}

/**
 * @deprecated
 * @param text
 * @returns {(function(*): void)|*}
 */
export function showDeleteError(text) {
    return dispatch => {
        dispatch(showAlert('Не удалось удалить данные. Ошибка: ' + text))
    }
}

/**
 * @deprecated
 * @returns {{type: string}}
 */
export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}
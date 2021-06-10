/**
 * В данном файле описаны "actions" для управления данными склада предприятия.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {STORAGE_TYPES} from "../../constants/types";
import {DataItem} from "../../models";
import Colors from "../../constants/colors";
import {getResponseErrorText} from "../../util/request-config";
import {palletIcon} from "../../icons";

/**
 * Получение актуальной данных о складе.
 *
 * @returns {function(*): Promise<void>}
 */
export const fetchActualStorage = () => {
    return async dispatch => {
        try {
            dispatch({type: STORAGE_TYPES.START_LOADING});
            const response = await axios.get(`/storage/actual`);
            if (response.status !== 200) {
                const errMessage = getResponseErrorText(response, 'Не удалось получить актуальную информацию о складе');
                alert(errMessage);
                console.error(errMessage);
                return;
            }
            const {storageItems} = response.data;
            dispatch({
                type: STORAGE_TYPES.FETCH_ACTUAL_STORAGE,
                payload: storageItems.map(storageItem => new DataItem(
                    storageItem.id,
                    storageItem.positionName,
                    storageItem.count,
                    palletIcon,
                    Colors.primary
                ))
            });
        } catch (err) {
            console.error(err.message);
        }
        dispatch({type: STORAGE_TYPES.END_LOADING});
    }
}

/**
 * Получение данных о выгрузках со склада.
 *
 * @returns {function(*): Promise<void>}
 */
export const fetchUnloadingEvents = () => {
    return async dispatch => {
        try {
            dispatch({type: STORAGE_TYPES.START_LOADING});
            const response = await axios.get(`/storage/unloading-events`);
            if (response.status !== 200) {
                const errMessage = getResponseErrorText(response, 'Не удалось получить информации о выгрузках');
                alert(errMessage);
                console.error(errMessage);
                return;
            }
            const unloadingEvents = response.data;
            dispatch({
                type: STORAGE_TYPES.FETCH_UNLOADING_EVENTS,
                payload: unloadingEvents
            });
        } catch (err) {
            console.error(err.message);
        }
        dispatch({type: STORAGE_TYPES.END_LOADING});
    }
}

/**
 * Добавление выгрузки на склад.
 *
 * @param unloadingEvent
 * @returns {function(*): Promise<void>}
 */
export const addUnloadingEvent = unloadingEvent => {
    return async dispatch => {
        try {
            dispatch({type: STORAGE_TYPES.START_LOADING});
            const parseUnloadingEvent = {
                dateTimeEdit: unloadingEvent.date,
                storageItems: Object.keys(unloadingEvent.formState)
                    .map(key => ({
                        positionId: key,
                        count: +unloadingEvent.formState[key]
                    }))
                    .filter(storageItem => storageItem.count > 0)
            }
            const response = await axios.post(`/storage/delete-items`, parseUnloadingEvent);
            if (response.status !== 200) {
                const errMessage = getResponseErrorText(response, 'Что то пошло не так');
                alert(errMessage);
                console.error(errMessage);
                return;
            }
            const newUnloadingEvent = response.data;
            dispatch({
                type: STORAGE_TYPES.ADD_UNLOADING_EVENT,
                payload: newUnloadingEvent
            });
        } catch (err) {
            alert(err.message);
            console.error(err.message);
        }
        dispatch({type: STORAGE_TYPES.END_LOADING});
    }
}

/**
 * Удаление данных о выгрузке.
 *
 * @param unloadingId
 * @returns {function(*): Promise<undefined>}
 */
export const deleteUnloadingEvent = unloadingId => {
    return async dispatch => {
        try {
            dispatch({type: STORAGE_TYPES.START_LOADING});
            const response = await axios.delete(`/storage/unloading-event`, {
                data: {
                    id: unloadingId
                }
            });
            if (response.status !== 200) {
                alert(getResponseErrorText(response, 'Что то пошло не так'));
                console.error(getResponseErrorText(response, 'Что то пошло не так'));
                return;
            }
            const answer = response.data;
            if (answer) {
                dispatch({
                    type: STORAGE_TYPES.DELETE_UNLOADING_EVENT,
                    payload: unloadingId
                })
                return;
            }
            console.error('Не удалось удалить событие.');
            alert('Не удалось удалить событие.')
        } catch (err) {
            alert(err.message);
            console.error(err.message);
        }
        dispatch({type: STORAGE_TYPES.END_LOADING});
    }
}
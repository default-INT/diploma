/**
 * В данном файле описаны "actions" для управления данными склада предприятия.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {STORAGE_TYPES} from "../../constants/types";
import {DataItem} from "../../models";
import IconsUri from "../../constants/icons";
import Colors from "../../constants/colors";
import {getResponseErrorText} from "../../utils";

/**
 * Получение актуальной данных о складе.
 *
 * @returns {function(*): Promise<void>}
 */
export const fetchActualStorage = () => {
    return async dispatch => {
        const response = await axios.get(`/storage/actual`);
        if (response.status !== 200) {
            throw new Error(getResponseErrorText(response, 'Не удалось получить актуальную информацию о складе'));
        }
        const {storageItems} = response.data;
        dispatch({
            type: STORAGE_TYPES.FETCH_ACTUAL_STORAGE,
            payload: storageItems.map(storageItem => new DataItem(
                storageItem.id,
                storageItem.positionName,
                storageItem.count,
                IconsUri.pallet,
                Colors.primary
            ))
        });
    }
}

/**
 * Получение данных о выгрузках со склада.
 *
 * @returns {function(*): Promise<void>}
 */
export const fetchUnloadingEvents = () => {
    return async dispatch => {
        const response = await axios.get(`/storage/unloading-events`);
        if (response.status !== 200) {
            throw new Error(getResponseErrorText(response, 'Не удалось получить информации о выгрузках'));
        }
        const unloadingEvents = response.data;
        dispatch({
            type: STORAGE_TYPES.FETCH_UNLOADING_EVENTS,
            payload: unloadingEvents
        });
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
            throw new Error(getResponseErrorText(response, 'Что то пошло не так'));
        }
        const newUnloadingEvent = response.data;
        dispatch({
            type: STORAGE_TYPES.ADD_UNLOADING_EVENT,
            payload: newUnloadingEvent
        })
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
        const response = await axios.delete(`/storage/unloading-event`, {
            data: {
                id: unloadingId
            }
        });
        if (response.status !== 200) {
            throw new Error(getResponseErrorText(response, 'Что то пошло не так'));
        }
        const answer = response.data;
        if (answer) {
            dispatch({
                type: STORAGE_TYPES.DELETE_UNLOADING_EVENT,
                payload: unloadingId
            })
            return;
        }
        throw new Error('Не удалось удалить событие.');
    }
}
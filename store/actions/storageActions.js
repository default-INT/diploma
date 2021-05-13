import {STORAGE_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";
import {DataItem} from "../../models";
import IconsUri from "../../constants/icons";
import Colors from "../../constants/colors";

export const fetchActualStorage = () => {
    return async dispatch => {
        const response = await fetch(`${SERVER_URL}/storage/actual`);
        if (!response.ok) {
            throw new Error('Что то пошло не так. Status: ' + response.status);
        }
        const {storageItems} = await response.json();
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

export const fetchUnloadingEvents = () => {
    return async dispatch => {
        const response = await fetch(`${SERVER_URL}/storage/unloading-events`);
        if (!response.ok) {
            throw new Error('Что то пошло не так. Status: ' + response.status);
        }
        const unloadingEvents = await response.json();
        dispatch({
            type: STORAGE_TYPES.FETCH_UNLOADING_EVENTS,
            payload: unloadingEvents
        });
    }
}

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
        const response = await fetch(`${SERVER_URL}/storage/delete-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parseUnloadingEvent)
        });
        if (!response.ok) {
            throw new Error('Что то пошло не так. Status: ' + response.status);
        }
        const newUnloadingEvent = await response.json();
        dispatch({
            type: STORAGE_TYPES.ADD_UNLOADING_EVENT,
            payload: newUnloadingEvent
        })
    }
}

export const deleteUnloadingEvent = unloadingId => {
    return async dispatch => {
        const response = await fetch(`${SERVER_URL}/storage/unloading-event`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: unloadingId
            })
        });
        if (!response.ok) {
            throw new Error('Что то пошло не так. Status: ' + response.status);
        }
        const answer = await response.json();
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
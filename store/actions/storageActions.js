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
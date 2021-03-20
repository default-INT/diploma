import {POSITION_TYPES} from "../../constants/types";
import {Position} from "../../models";

export const addPosition = position => {
    return ({
        type: POSITION_TYPES.ADD_POSITION,
        payload: new Position(
            new Date().toISOString(),
            position.name,
            position.itemTariff,
            position.itemName,
            position.isPallet,
            position.isStorage
        )
    });
}

export const updatePosition = position => {
    return {
        type: POSITION_TYPES.UPDATE_POSITION,
        payload: new Position(
            position.id,
            position.name,
            position.itemTariff,
            position.itemName,
            position.isPallet,
            position.isStorage
        )
    };
}

export const deletePosition = positionId => {
    return {
        type: POSITION_TYPES.DELETE_POSITION,
        payload: positionId
    }
}
import {POSITIONS} from "../../data/dummy-data";
import {POSITION_TYPES} from "../../constants/types";

const initialState = {
    availablePositions: POSITIONS
}

const handlers = {
    [POSITION_TYPES.FETCH_ALL]: (state, {payload}) => ({
        ...state,
        availablePositions: payload
    }),
    [POSITION_TYPES.ADD_POSITION]: (state, {payload}) => ({
        ...state,
        availablePositions: state.availablePositions.concat(payload)
    }),
    [POSITION_TYPES.UPDATE_POSITION]: (state, {payload}) => {
        const updateIdx = state.availablePositions.findIndex(p => p.id === payload.id);
        const updatedPositions = [...state.availablePositions];
        updatedPositions[updateIdx] = payload;
        return ({
            ...state,
            availablePositions: updatedPositions
        })
    },
    [POSITION_TYPES.DELETE_POSITION]: (state, {payload}) => ({
        ...state,
        availablePositions: state.availablePositions.filter(p => p.id !== payload)
    }),
    DEFAULT: state => state
}

export const positionReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
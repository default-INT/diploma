import {POSITION_TYPES} from "../../constants/types";

const initialState = {
    availablePositions: [],
    loading: false,
    error: null
}

const handlers = {
    [POSITION_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [POSITION_TYPES.FETCH_ALL]: (state, {payload}) => ({
        ...state,
        availablePositions: payload
    }),
    [POSITION_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [POSITION_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
    [POSITION_TYPES.ADD_POSITION]: (state, {payload}) => ({
        ...state,
        availablePositions: state.availablePositions.concat(payload)
            .sort((p1, p2) => p1.id > p2.id ? 1 : -1)
    }),
    [POSITION_TYPES.UPDATE_POSITION]: (state, {payload}) => {
        const {position, oldId} = payload;
        const updateIdx = state.availablePositions.findIndex(p => p.id === oldId);
        const updatedPositions = [...state.availablePositions];
        updatedPositions[updateIdx] = position;
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
import {CREATE_POSITION, DELETE_POSITION, FETCH_POSITIONS, UPDATE_POSITION} from "../../types";

const initialState = {
    positions: []
}

const handlers = {
    [CREATE_POSITION]: (state, {payload}) => ({
        ...state,
        positions: state.positions.concat([payload])
    }),
    [FETCH_POSITIONS]: (state, {payload}) => ({...state, positions: payload}),
    [UPDATE_POSITION]: (state, {payload}) => ({
        ...state,
        positions: state.positions.filter(p => p.id !== payload.id).concat([payload])
    }),
    [DELETE_POSITION]: (state, {payload}) => ({
        ...state,
        positions: state.positions.filter(p => p.id !== payload.id)
    }),
    DEFAULT: state => state
}

export const positionReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
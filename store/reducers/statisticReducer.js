import {STAT_TYPES} from "../../constants/types";


const initialState = {
    employeeStatistic: null
}

const handlers = {
    [STAT_TYPES.FETCH_EMPLOYEE_STAT]: (state, {payload}) => ({
        ...state,
        employeeStatistic: payload
    }),
    DEFAULT: state => state
}

export const statisticReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}
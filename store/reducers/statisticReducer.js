import {STAT_TYPES} from "../../constants/types";


const initialState = {
    employeesStatistic: null
}

const handlers = {
    [STAT_TYPES.FETCH_EMPLOYEE_STAT]: (state, {payload}) => ({
        ...state,
        employeesStatistic: payload
    }),
    [STAT_TYPES.FETCH_STAT_BY_EMPLOYEE]: (state, {payload}) => ({
        ...state,
        statisticByEmployee: payload
    }),
    DEFAULT: state => state
}

export const statisticReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}
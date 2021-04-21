import {COMPANY_DATA} from "../../data/dummy-data";
import {COMPANY_TYPES} from "../../constants/types";

const initialState = {
    countEmployee: COMPANY_DATA.countEmployee,
    avgSalary: COMPANY_DATA.avgSalary,
    income: COMPANY_DATA.income
}


const handlers = {
    [COMPANY_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [COMPANY_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [COMPANY_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
    [COMPANY_TYPES.FETCH_AVG_SALARY_ON_DAY]: (state, {payload}) => ({
        ...state,
        avgSalary: payload
    }),
    [COMPANY_TYPES.FETCH_COUNT_EMPLOYEES]: (state, {payload}) => ({
        ...state,
        countEmployee: payload
    }),
    DEFAULT: state => state
}

export const companyReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
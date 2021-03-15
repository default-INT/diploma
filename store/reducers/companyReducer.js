import {COMPANY_DATA} from "../../data/dummy-data"

const initialState = {
    countEmployee: COMPANY_DATA.countEmployee,
    avgSalary: COMPANY_DATA.avgSalary,
    income: COMPANY_DATA.income
}


const handlers = {
    DEFAULT: state => state
}

export const companyReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
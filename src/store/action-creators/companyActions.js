import {COMPANY_TYPES} from "../../constants/types";

export const startLoading = () => ({
    type: COMPANY_TYPES.START_LOADING
});

export const endLoading = () => ({
    type: COMPANY_TYPES.END_LOADING
});

export const setError = errMessage => ({
    type: COMPANY_TYPES.SET_ERROR,
    payload: errMessage
});

export const fetchAvgSalaryOnDay = () => ({
    type: COMPANY_TYPES.FETCH_AVG_SALARY_ON_DAY
});

export const fetchCountEmployees = () => ({
    type: COMPANY_TYPES.FETCH_COUNT_EMPLOYEES
});

export const fetchCompanyData = () => ({
    type: COMPANY_TYPES.FETCH_COMPANY_DATA
});

export const setAvgSalaryOnDay = avgSalary => ({
    type: COMPANY_TYPES.SET_AVG_SALARY_ON_DAY,
    payload: avgSalary
});

export const setCountEmployees = count => ({
    type: COMPANY_TYPES.SET_COUNT_EMPLOYEES,
    payload: count
});
import {REPORT_TYPES} from "../../constants/types";

export const startLoading = () => ({
    type: REPORT_TYPES.START_LOADING
});

export const endLoading = () => ({
    type: REPORT_TYPES.END_LOADING
});

export const setError = errMessage => ({
    type: REPORT_TYPES.SET_ERROR,
    payload: errMessage
});

export const fetchMonthlyReports = (month, year) => ({
    type: REPORT_TYPES.FETCH_MONTHLY_REPORTS,
    payload: {
        month, year
    }
});

export const setMonthlyReports = monthlyReports => ({
    type: REPORT_TYPES.SET_MONTHLY_REPORTS,
    payload: monthlyReports
});
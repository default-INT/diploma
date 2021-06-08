import {USER_TYPES} from "../../constants/types";


/**
 *
 * @returns {{type: string}}
 */
export const fetchAvgMonthSalary = () => ({
    type: USER_TYPES.FETCH_AVG_MONTH_SALARY
});

/**
 *
 * @param monthSalary {number}
 * @returns {{payload, type: string}}
 */
export const setAvgMonthSalary = monthSalary => ({
    type: USER_TYPES.FETCH_AVG_MONTH_SALARY,
    payload: monthSalary
});

/**
 *
 * @returns {{type: string}}
 */
export const fetchTotalMonthSalary = () => ({
    type: USER_TYPES.FETCH_TOTAL_MONTH_SALARY
});

/**
 *
 * @param totalMonthSalary {number}
 * @returns {{payload, type: string}}
 */
export const setTotalMonthSalary = totalMonthSalary => ({
    type: USER_TYPES.SET_TOTAL_MONTH_SALARY,
    payload: totalMonthSalary
});

/**
 *
 * @returns {{type: string}}
 */
export const startLoading = () => ({
    type: USER_TYPES.START_LOADING
});

/**
 *
 * @returns {{type: string}}
 */
export const endLoading = () => ({
    type: USER_TYPES.END_LOADING
});

/**
 *
 * @param errMessage {string|null}
 * @returns {{payload, type: string}}
 */
export const setError = errMessage => ({
    type: USER_TYPES.SET_ERROR,
    payload: errMessage
})
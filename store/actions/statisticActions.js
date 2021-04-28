import {REPORTS_TYPES, STAT_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";

const dateFormatter = date => date.toJSON().split('T')[0];

export const getEmployeeStatistic = (date1, date2) => {
    return async dispatch => {
        dispatch({type: STAT_TYPES.SET_ERROR, payload: null});

        try {
            const dateAfter = dateFormatter(date1);
            const dateBefore = dateFormatter(date2);

            const response = await fetch(`${SERVER_URL}/stat/employees?dateAfter=${dateAfter}&dateBefore=${dateBefore}`);
            if (!response.ok) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить статистику по заданной дате. Status: ' + response.status
                })
                return;
            }
            const statistic = await response.json();
            dispatch({
                type: STAT_TYPES.FETCH_EMPLOYEE_STAT,
                payload: statistic
            })
        } catch (err) {
            dispatch({type: STAT_TYPES.SET_ERROR, payload: err.message});
        }
    }
}
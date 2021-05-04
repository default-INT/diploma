import {REPORTS_TYPES, STAT_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";

const dateFormatter = date => date.toJSON().split('T')[0];

export const getEmployeeStatistic = (date1, date2) => {
    return async dispatch => {
        const dateAfter = dateFormatter(date1);
        const dateBefore = dateFormatter(date2);

        const response = await fetch(`${SERVER_URL}/stat/employees?dateAfter=${dateAfter}&dateBefore=${dateBefore}`);

        if (!response.ok) {
            throw new Error('Не удалось получить статистику по заданной дате. Status: ' + response.status);
        }
        const statistic = await response.json();
        dispatch({
            type: STAT_TYPES.FETCH_EMPLOYEE_STAT,
            payload: statistic
        });
    }
};

export const getStatisticByEmployee = (date1, date2, employeeId) => {
    return async dispatch => {
        const dateAfter = dateFormatter(date1);
        const dateBefore = dateFormatter(date2);

        const response = await fetch(`${SERVER_URL}/stat/employees?dateAfter=${dateAfter}&dateBefore=${dateBefore}&employeeId=${employeeId}`);

        if (!response.ok) {
            throw new Error('Не удалось получить статистику по заданной дате и сотруднику. Status: ' + response.status);
        }
        const statistic = await response.json();
        if (statistic.length === 0) {
            throw new Error('Данный сотрудник в выбранный период времени не выолнял никакой работы.');
        }
        dispatch({
            type: STAT_TYPES.FETCH_STAT_BY_EMPLOYEE,
            payload: statistic[0]
        });
    }
}
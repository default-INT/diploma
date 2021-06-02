import {REPORTS_TYPES, STAT_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";
import axios from "axios";
import {toDateFormat} from "../../utils";

const dateFormatter = date => date.toJSON().split('T')[0];
const toDateStrFormatter = date => {
    const [day, month, year] = toDateFormat(date).split('.')
    return `${year}-${month}-${day}`
};

export const getEmployeeStatistic = (date1, date2) => {
    return async dispatch => {
        const dateAfter = toDateStrFormatter(date1);
        const dateBefore = toDateStrFormatter(date2);

        const response = await axios.get(`/stat/employees`, {
            params: {
                dateAfter, dateBefore
            }
        });

        if (response.status !== 200) {
            throw new Error('Не удалось получить статистику по заданной дате. Status: ' + response.status);
        }
        const statistic = response.data;
        dispatch({
            type: STAT_TYPES.FETCH_EMPLOYEE_STAT,
            payload: statistic
        });
    }
};

export const getStatisticByEmployee = (date1, date2, employeeId) => {
    return async dispatch => {
        const dateAfter = toDateStrFormatter(date1);
        const dateBefore = toDateStrFormatter(date2);

        const response = await axios.get(`/stat/employees`, {
            params: {
                dateAfter, dateBefore, employeeId
            }
        });

        if (response.status !== 200) {
            throw new Error('Не удалось получить статистику по заданной дате и сотруднику. Status: ' + response.status);
        }
        const statistic = response.data;
        if (statistic.length === 0) {
            throw new Error('Данный сотрудник в выбранный период времени не выолнял никакой работы.');
        }
        dispatch({
            type: STAT_TYPES.FETCH_STAT_BY_EMPLOYEE,
            payload: statistic[0]
        });
    }
}
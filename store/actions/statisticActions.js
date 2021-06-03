/**
 * В данном файле описаны "actions" для управления данными о статистике производственной деятельности предприятия.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {STAT_TYPES} from "../../constants/types";
import {toDateFormat} from "../../utils";

/**
 * Функция форматирует дату для JSON-формата.
 *
 * @param date {Date}
 * @returns {string}
 */
const toDateStrFormatter = date => {
    const [day, month, year] = toDateFormat(date).split('.')
    return `${year}-${month}-${day}`
};

/**
 * Отправляет GET-запрос на HTTP-сервер для получения статистики в определённом временном промежутке.
 *
 * @param date1 {Date}
 * @param date2 {Date}
 * @returns {function(*): Promise<void>}
 */
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

/**
 * Отправляет GET-запрос на HTTP-сервер для получения статистики для определённого сотрудника
 * в определённом временном промежутке.
 *
 * @param date1 {Date}
 * @param date2 {Date}
 * @param employeeId {string}
 * @returns {function(*): Promise<void>}
 */
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
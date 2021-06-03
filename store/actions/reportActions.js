/**
 * В данном файле описаны "actions" для управления данными о отчётах.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {POSITION_TYPES, REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";
import {EmployeeItem, Report, WorkItem} from "../../models";

/**
 * Отправляет GET-запрос на HTTP-сервер, для получения данных о отчётах.
 *
 * @param page {number}
 * @returns {function(*): Promise<undefined>}
 */
export const fetchLastReports = page => {
    return async dispatch => {
        dispatch(dispatch({
            type: REPORTS_TYPES.CREATE_EMPTY_REPORT,
            payload: new Report(
                new Date().toISOString(),
                new Date(),
                [],
                [],
                0
            )
        }));
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.get(`/reports`, {
                params: {
                    page,
                    size: 10
                }
            });
            if (response.status !== 200) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные об отчётах. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const reports = response.data;
            dispatch({
                type: REPORTS_TYPES.FETCH_LAST_REPORTS,
                payload: reports.map(report => Report.of(report))
            });
        } catch (err) {
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
        dispatch({type: REPORTS_TYPES.END_LOADING});
    }
}

/**
 * Отправляет POST-запрос на HTTP-сервер для создания ноговго отчёта.
 *
 * @param date {Date}
 * @param report {object}
 * @returns {function(*): Promise<undefined>}
 */
export const addReport = (date, report) => {
    return async (dispatch) => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.post(`/reports`, {
                ...report.toReq(),
                date: date
            });
            if (response.status !== 200) {
                console.log('response error');
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось добавить отчёт. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const newReport = response.data;

            dispatch({
                type: REPORTS_TYPES.ADD_REPORT,
                payload: Report.of(newReport)
            });
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
        dispatch({type: REPORTS_TYPES.END_LOADING});
    }
};

/**
 * Отправляет PUT-запрос на сервер с отредактироваными данными о отчёте.
 *
 * @param date {Date}
 * @param report {object}
 * @returns {function(*): Promise<undefined>}
 */
export const updateReport = (date, report) => {
    return async dispatch => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.put(`/reports`, {
                id: report.id,
                ...Report.toHttpRequestFormat(report),
                date: date
            });
            if (response.status !== 200) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось обновить. данные об отчёте. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const updateReport = response.data;
            dispatch({
                type: REPORTS_TYPES.UPDATE_REPORT,
                payload: {
                    report: Report.of(updateReport),
                    oldId: report.id
                }
            });
        } catch (err) {
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
        dispatch({type: REPORTS_TYPES.END_LOADING});
    }
}

/**
 * Отправляет DELETE-запрос на HTTP-сервер с ID отчёта, для его последующего удаления из системы.
 *
 * @param reportId {string}
 * @returns {function(*): Promise<undefined>}
 */
export const deleteReport = reportId => {
    return async dispatch => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.delete(`/reports/` + reportId);
            if (response.status !== 200 ) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить удалить отчёт. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const answer = response.data;
            if (answer) {
                dispatch({
                    type: REPORTS_TYPES.DELETE_REPORT,
                    payload: reportId
                });
            } else {
                dispatch({
                    type: POSITION_TYPES.SET_ERROR,
                    payload: 'Не удалось удалить тариф. Status: ' + response.status
                });
            }
        } catch (err) {
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
        dispatch({type: REPORTS_TYPES.END_LOADING});
    };
};

/**
 * Отправляет GET-запрос на сервер для получения отчётов для текущего месяца и года.
 *
 * @param month {number}
 * @param year {number}
 * @returns {function(*): Promise<undefined>}
 */
export const fetchMonthlyReports = (month, year) => {
    return async dispatch => {
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            // TODO: check this api to server
            const response = await axios.get(`/reports`, {
                params: {
                    month, year
                }
            });
            if (response.status !== 200) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные об отчётах. Status: ' + response.status
                });
                return;
            }
            const reports = response.data;
            dispatch({
                type: REPORTS_TYPES.FETCH_MONTHLY_REPORTS,
                payload: {
                    month, year,
                    reports: reports.map(report => Report.of(report))
                }
            });
        }  catch (err) {
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
    }
};

/**
 * Производит поиск в "selectedReport" данных о производственной деятельности сотрудника
 * с id === employeeItemId.
 *
 * @param employeeItemId {string}
 * @returns {function(*, *): void}
 */
export const loadSelectedEmployeeItem = employeeItemId => {
    return (dispatch, getState) => {
        const {selectedReport} = getState().reports;
        let selectedEmployeeItem;
        if (employeeItemId) {
            selectedEmployeeItem = selectedReport.employeeItems
                .find(employeeItem => employeeItem.id === employeeItemId);
        } else {
            selectedEmployeeItem = new EmployeeItem(
                new Date().toISOString(),
                null,
                [],
                0
            );
        }
        dispatch({
            type: REPORTS_TYPES.LOAD_SELECTED_EMPLOYEE_ITEM,
            payload: selectedEmployeeItem
        });
    }
}

/**
 * Производит редактирование в "selectedEmployeeItem.workItems", изменяя данные о единице выполненной
 * сотрудником работы по определённому тарифу.
 *
 * @param workItem {object}
 * @returns {{payload: WorkItem, type: string}}
 */
export const updateWorkItemReport = workItem => {
    return {
        type: REPORTS_TYPES.UPDATE_WORK_ITEM_REPORT,
        payload: new WorkItem(
            workItem.id,
            workItem.position,
            workItem.itemNum,
            workItem.salary
        )
    }
}

/**
 * Удаляет единицу выполненной работы для определённого сотрудника по workItemId.
 *
 * @param workItemId {string}
 * @returns {{payload, type: string}}
 */
export const deleteWorkItemReport = workItemId => {
    return {
        type: REPORTS_TYPES.DELETE_WORK_ITEM_REPORT,
        payload: workItemId
    }
}

/**
 * Добавляет единицу выполненной работы для определённого сотрудника по employeeItemId.
 *
 * @param workItem {object}
 * @param employeeItemId {string}
 * @returns {{payload, type: string}}
 */
export const addWorkItemToReport = (workItem, employeeItemId) => {
    return {
        type: REPORTS_TYPES.ADD_WORK_ITEM_REPORT,
        payload: new WorkItem(
            new Date().toISOString(),
            workItem.position,
            workItem.itemNum,
            workItem.salary
        ),
        employeeItemId
    }
}

/**
 * Создаёт пустой отчёт в STATE/REPORTS
 *
 * @deprecated 02.06.2021 - 17:45 P.S. Придумать более оптимальный способ.
 * @param date
 * @returns {function(*): void}
 */
export const createEmptyReport = date => {
    return dispatch => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({
            type: REPORTS_TYPES.CREATE_EMPTY_REPORT,
            payload: new Report(
                new Date().toISOString(),
                date,
                [],
                [],
                0
            )
        });
        dispatch({type: REPORTS_TYPES.END_LOADING});
    }
}

/**
 * Обновляеет данные о производственной деятельности сотрудника в определённый день для соответствующегося отчёта.
 *
 * @param payload {object}
 * @returns {{payload, type: string}}
 */
export const updateEmployeeItemReport = payload => {
    return {
        type: REPORTS_TYPES.UPDATE_EMPLOYEE_ITEM_REPORT,
        payload: payload
    }
}

/**
 * Удаляет данные о производственной деятельности сотрудника в определённый день для соответствующегося отчёта.
 *
 * @param employeeItemId {string}
 * @returns {{payload, type: string}}
 */
export const deleteEmployeeItemReport = employeeItemId => {
    return {
        type: REPORTS_TYPES.DELETE_EMPLOYEE_ITEM_REPORT,
        payload: employeeItemId
    }
}

/**
 * Добавляет данные о производственной деятельности сотрудника в определённый день для соответствующегося отчёта.
 *
 * @param payload {object}
 * @returns {{payload, type: string}}
 */
export const addEmployeeItemReport = payload => {
    return {
        type: REPORTS_TYPES.ADD_EMPLOYEE_ITEM_REPORT,
        payload: payload
    }
}

/**
 * Добавляет выбраннный отчёт в STATE.
 *
 * @deprecated 02.06.2021 - 17:50 - Не самый рациональный метод.
 * @param report {object}
 * @returns {{payload, type: string}}
 */
export const selectReport = report => {
    return {
        type: REPORTS_TYPES.GET_REPORT,
        payload: report
    }
}

/**
 * Проверить где метод используется и удалить из этих мест.
 * После тестирования кода желательно удалить.
 *
 * @deprecated 02.06.2021 - 17:30
 * @param reportId
 * @returns {{payload: {date: Date, employeeItems: Array<EmployeeItem>, totalSalary: number, toReq: function(): {date: Date, employeeItems: {totalSalary: number, workItems: *, employeeId: string}[]}, dayStats: Array<DayStat>, id: string}, type: string}}
 */
export const getReport = reportId => {
    return {
        type: REPORTS_TYPES.GET_REPORT,
        payload: {...REPORTS.find(report => report.id === reportId)}
    }
}
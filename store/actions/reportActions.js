import {REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";
import {SERVER_URL} from "../../constants";
import {EmployeeItem, Report, WorkItem} from "../../models";

export const fetchLastReports = page => {
    return async dispatch => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/reports?size=10&page=${page}`);
            if (!response.ok) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные об отчётах. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const reports = await response.json();
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

export const addReport = (date, report) => {
    return async (dispatch, getState) => {
        dispatch({type: REPORTS_TYPES.START_LOADING});
        dispatch({type: REPORTS_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...report.toReq(),
                    date: date
                })
            });
            if (!response.ok) {
                dispatch({
                    type: REPORTS_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные об отчётах. Status: ' + response.status
                });
                dispatch({type: REPORTS_TYPES.END_LOADING});
                return;
            }
            const newReport = await response.json();

            dispatch({
                type: REPORTS_TYPES.ADD_REPORT,
                payload: Report.of(newReport)
            });
        } catch (err) {
            dispatch({
                type: REPORTS_TYPES.SET_ERROR,
                payload: err.message
            });
        }
        dispatch({type: REPORTS_TYPES.END_LOADING});
    }
};

export const fetchMonthlyReports = month => {
    return {
        type: REPORTS_TYPES.FETCH_MONTHLY_REPORTS,
        payload: REPORTS.filter(report => report.date.getMonth() === month)
    }
}

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

export const deleteWorkItemReport = workItemId => {
    return {
        type: REPORTS_TYPES.DELETE_WORK_ITEM_REPORT,
        payload: workItemId
    }
}

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

export const createEmptyReport = date => {
    return {
        type: REPORTS_TYPES.CREATE_EMPTY_REPORT,
        payload: new Report(
            new Date().toISOString(),
            date,
            [],
            [],
            0
        )
    }
}

// export const createEmptyEmployeeItemRep

export const updateEmployeeItemReport = payload => {
    return {
        type: REPORTS_TYPES.UPDATE_EMPLOYEE_ITEM_REPORT,
        payload: payload
    }
}

export const deleteEmployeeItemReport = employeeItemId => {
    return {
        type: REPORTS_TYPES.DELETE_EMPLOYEE_ITEM_REPORT,
        payload: employeeItemId
    }
}

export const addEmployeeItemReport = payload => {
    return {
        type: REPORTS_TYPES.ADD_EMPLOYEE_ITEM_REPORT,
        payload: payload
    }
}

export const selectReport = report => {
    return {
        type: REPORTS_TYPES.GET_REPORT,
        payload: report
    }
}

export const getReport = reportId => {
    return {
        type: REPORTS_TYPES.GET_REPORT,
        payload: {...REPORTS.find(report => report.id === reportId)}
    }
}

export const updateReport = report => {
    return {
        type: REPORTS_TYPES.UPDATE_REPORT,
        payload:  new Report(
            report.id,
            report.date,
            report.workItems,
            report.dayStats,
            report. totalSalary
        )
    }
};

export const deleteReport = reportId => {
    return {
        type: REPORTS_TYPES.DELETE_REPORT,
        payload: reportId
    }
};
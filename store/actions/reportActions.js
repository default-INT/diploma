import {REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";
import {Report, DayStat} from "../../models";

export const fetchMonthlyReports = month => {
    return {
        type: REPORTS_TYPES.FETCH_MONTHLY_REPORTS,
        payload: REPORTS.filter(report => report.date.getMonth() === month)
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

export const addEmployeeItemReport = payload => {
    return {
        type: REPORTS_TYPES.ADD_EMPLOYEE_ITEM_REPORT,
        payload: payload
    }
}

export const getReport = reportId => {
    return {
        type: REPORTS_TYPES.GET_REPORT,
        payload: REPORTS.find(report => report.id === reportId)
    }
}

export const addReport = report => {
    return {
        type: REPORTS_TYPES.ADD_REPORT,
        payload: new Report(
            new Date().toISOString(),
            report.date,
            report.workItems,
            report.dayStats,
            report. totalSalary
        )
    };
};

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
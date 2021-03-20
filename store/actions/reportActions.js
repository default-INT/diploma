import {REPORTS_TYPES} from "../../constants/types";
import {Report} from "../../models";


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
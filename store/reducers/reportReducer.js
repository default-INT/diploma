import {REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";
import {DayStat, EmployeeItem} from "../../models";

const initialState = {
    lastReports: REPORTS,
    monthlyReports: REPORTS.filter(report => report.date.getMonth() === 3),
    selectedReport: null,
    selectedEmployeeItem: null
}


const handlers = {
    [REPORTS_TYPES.FETCH_LAST_REPORTS]: (state, {payload}) => ({
        ...state,
        lastReports: payload
    }),
    [REPORTS_TYPES.FETCH_MONTHLY_REPORTS]: (state, {payload}) => ({
        ...state,
        monthlyReports: payload
    }),
    [REPORTS_TYPES.ADD_REPORT]: (state, {payload}) => ({
        ...state,
        lastReports: [payload, ...state.lastReports],
        monthlyReports: payload.date.getMonth() === state.monthlyReports[0].getMonth() ?
            state.monthlyReports.concat(payload).sort((d1, d2) => d1 > d2 ? 1 : -1)
            : state.monthlyReports
    }),
    [REPORTS_TYPES.UPDATE_REPORT]: (state, {payload}) => {
        const updateLastReportIdx = state.lastReports.findIndex(report => report.id === payload.id);
        const updateMonthlyReportIdx = state.lastReports.findIndex(report => report.id === payload.id);
        let newState = {
            ...state
        }
        if (updateLastReportIdx) {
            const updatedLastReports = [...state.lastReports];
            updatedLastReports[updateLastReportIdx] = payload;
            newState = {
                ...newState,
                lastReports: updatedLastReports
            };
        }

        if (updateMonthlyReportIdx) {
            const updatedMonthlyReports = [...state.monthlyReports];
            updatedMonthlyReports[updateMonthlyReportIdx] = payload;
            newState = {
                ...newState,
                monthlyReports: updatedMonthlyReports
            };
        }

        return newState;
    },
    [REPORTS_TYPES.DELETE_REPORT]: (state, {payload}) => ({
        ...state,
        lastReports: state.lastReports.filter(report => report.id !== payload),
        monthlyReports: state.monthlyReports.filter(report => report.id !== payload)
    }),
    [REPORTS_TYPES.GET_REPORT]: (state, {payload}) => ({
        ...state,
        selectedReport: payload
    }),
    [REPORTS_TYPES.ADD_EMPLOYEE_ITEM_REPORT]: (state, {payload}) => {
        const updateSelectedReport = {...state.selectedReport};
        updateSelectedReport.employeeItems.push(payload);

        return {
            ...state,
            selectedReport: updateSelectedReport
        }
    },
    [REPORTS_TYPES.DELETE_EMPLOYEE_ITEM_REPORT]: (state, {payload}) => ({
        ...state,
        selectedReport: {
            ...state.selectedReport,
            employeeItems: state.selectedReport.employeeItems.filter(e => e.id !== payload)
        }
    }),
    [REPORTS_TYPES.ADD_WORK_ITEM_REPORT]: (state, {payload}) => ({
        ...state,
        selectedEmployeeItem: {
            ...state.selectedEmployeeItem,
            workItems: state.selectedEmployeeItem.workItems
                .concat(payload)
        }
    }),
    [REPORTS_TYPES.UPDATE_WORK_ITEM_REPORT]: (state, {payload}) => {
        const workItems = [...state.selectedEmployeeItem.workItems];
        const updatedWorkItemIdx = workItems.findIndex(workItem => workItem.id === payload.id);
        workItems[updatedWorkItemIdx] = payload;
        return {
            ...state,
            selectedEmployeeItem: {
                ...state.selectedEmployeeItem,
                workItems: workItems
            }
        };
    },
    [REPORTS_TYPES.DELETE_WORK_ITEM_REPORT]: (state, {payload}) => ({
        ...state,
        selectedEmployeeItem: {
            ...state.selectedEmployeeItem,
            workItems: state.selectedEmployeeItem.workItems.filter(({id}) => id !== payload)
        }
    }),
    [REPORTS_TYPES.LOAD_SELECTED_EMPLOYEE_ITEM]: (state, {payload}) => ({
        ...state,
        selectedEmployeeItem: payload
    }),
    [REPORTS_TYPES.UPDATE_EMPLOYEE_ITEM_REPORT]: (state, {payload}) => {
        const updateSelectedReport = {...state.selectedReport};
        const updateIdx = updateSelectedReport.employeeItems.findIndex(employeeItem => employeeItem.id === payload.id);
        updateSelectedReport.employeeItems[updateIdx] = payload;

        return {
            ...state,
            selectedReport: updateSelectedReport
        }
    },
    [REPORTS_TYPES.CREATE_EMPTY_REPORT]: (state, {payload}) => ({
        ...state,
        selectedReport: payload
    }),
    DEFAULT: state => state
}

export const reportReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
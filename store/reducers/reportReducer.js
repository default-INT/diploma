/**
 * В данном файле описан "reducer" для изменения состояния о отчётах в глобальном STATE.
 */
import {REPORTS_TYPES} from "../../constants/types";

/**
 *
 * @type {{selectedReport: null, lastReports: [], loading: boolean, error: null, monthlyReports: {reports: [], month: number, year: number}, selectedEmployeeItem: null}}
 */
const initialState = {
    loading: false,
    error: null,
    lastReports: [],
    monthlyReports: {
        month: 3,
        year: 2021,
        reports: []
    },
    selectedReport: null,
    selectedEmployeeItem: null
}

/**
 * Объект, который по ключам (TYPES), возвращает определённые функции для изменения состояния.
 */
const handlers = {

    [REPORTS_TYPES.SET_ERROR]: (state, {payload}) => ({
        ...state,
        error: payload
    }),
    [REPORTS_TYPES.START_LOADING]: (state) => ({
        ...state,
        loading: true
    }),
    [REPORTS_TYPES.END_LOADING]: (state) => ({
        ...state,
        loading: false
    }),
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
        lastReports: [payload, ...state.lastReports].sort((r1, r2) => r1.date > r2.date ? 1 : -1),
        monthlyReports: payload.date.getMonth() === state.monthlyReports[0].getMonth() ?
            state.monthlyReports.concat(payload).sort((r1, r2) => r1.date > r2.date ? 1 : -1)
            : state.monthlyReports
    }),
    [REPORTS_TYPES.UPDATE_REPORT]: (state, {payload}) => {
        const {report:updateReport, oldId} = payload;
        return {
            ...state,
            lastReports: [updateReport, ...state.lastReports.filter(report => report.id !== oldId)]
                .sort((r1, r2) => r1.date > r2.date ? 1 : -1),
            monthlyReports: payload.date.getMonth() === state.monthlyReports[0].getMonth() ?
                state.monthlyReports
                    .filter(report => report.id !== oldId)
                    .concat(updateReport)
                    .sort((r1, r2) => r1.date > r2.date ? 1 : -1)

                : state.monthlyReports.filter(report => report.id !== oldId)
        }
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

/**
 * Функция редюсер.
 *
 * @param state {object}
 * @param action {object}
 * @returns {*}
 */
export const reportReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}
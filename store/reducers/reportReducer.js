import {REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";

const initialState = {
    lastReports: REPORTS,
    monthlyReports: REPORTS.filter(report => report.date.getMonth() === 3)
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
    DEFAULT: state => state
}

export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
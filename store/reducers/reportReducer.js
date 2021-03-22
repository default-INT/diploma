import {REPORTS_TYPES} from "../../constants/types";
import {REPORTS} from "../../data/dummy-data";
import {DayStat} from "../../models";

const initialState = {
    lastReports: REPORTS,
    monthlyReports: REPORTS.filter(report => report.date.getMonth() === 3),
    selectedReport: null
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
    [REPORTS_TYPES.ADD_WORK_ITEM_REPORT]: (state, {payload}) => {
        const updateSelectedReport = {...state.selectedReport};
        updateSelectedReport.workItems.push(payload);
        const updatedDayStatIdx = updateSelectedReport.dayStats.filter(dayStat => dayStat.position.id === payload.position.id);
        if (updatedDayStatIdx) {
            updateSelectedReport.dayStats[updatedDayStatIdx].totalNum += payload.itemNum;
            updateSelectedReport.dayStats[updatedDayStatIdx].totalSalary += payload.position.itemTariff * payload.itemNum;
        } else {
            const dayStat = new DayStat(
                new Date().toISOString(),
                payload.position,
                payload.itemNum,
                payload.position.itemTariff * payload.itemNum
            );
            updateSelectedReport.dayStats.push(dayStat);
        }
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
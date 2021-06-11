import {call, put, takeLatest} from "redux-saga/effects";

import {reportActions} from "../action-creators";
import {REPORT_TYPES} from "../../constants/types";
import {getMonthlyReports} from "./api";
import {Report} from "../../models";


function * fetchMonthlyReportsWorker({payload}) {
    const {month, year} = payload;
    try {
        yield put(reportActions.startLoading());
        const response = yield call(getMonthlyReports, month, year);
        const reports = response.data;
        const mapReport = reports.map(report => Report.of(report))
        yield put(reportActions.setMonthlyReports(
            mapReport
        ));
    } catch (err) {
        console.error(err.message);
    }
    yield put(reportActions.endLoading());
}


export default function * watchReport() {
    yield takeLatest(REPORT_TYPES.FETCH_MONTHLY_REPORTS, fetchMonthlyReportsWorker);
}
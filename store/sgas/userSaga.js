import {takeLatest, put, call, all, cancel} from "redux-saga/effects";

import {getAvgMonthSalary, getTotalMonthSalary} from "./api";
import {userActions} from "../actions-creators";
import {USER_TYPES} from "../../constants/types";
import {getResponseErrorText} from "../../utils";

function* responseCheckerAndSetError(response, message) {
    if (response.status !== 200) {
        yield put(userActions.endLoading());

        const errMessage = getResponseErrorText(response, message);

        yield put(userActions.setError(errMessage));
        console.log(errMessage);
        yield cancel();
    }
}

function* fetchUserDataWorker() {
    try {
        yield put(userActions.setError(null));
        yield put(userActions.startLoading());

        const [responseAvg, responseTotal] = yield all([
            call(getAvgMonthSalary),
            call(getTotalMonthSalary)
        ]);

        yield responseCheckerAndSetError(responseAvg, 'Не удалось получить данные о средней зарплате.');
        yield responseCheckerAndSetError(responseTotal, 'Не удалось получить данные о зарплате за месяц.');

        yield put(userActions.setAvgMonthSalary(+responseAvg.data));
        yield put(userActions.setTotalMonthSalary(+responseTotal.data));

    } catch (err) {
        yield put(userActions.setError(err.message));
    }
    yield put(userActions.startLoading());
}

function* userWatcher() {
    takeLatest(USER_TYPES.FETCH_USER_DATA, fetchUserDataWorker);
}
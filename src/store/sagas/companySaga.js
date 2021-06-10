import {all, call, cancel, put, takeLatest} from "redux-saga/effects";

import {companyActions} from "../action-creators";
import {COMPANY_TYPES} from "../../constants/types";
import {getResponseErrorText} from "../../util/request-config";
import {getAvgSalary, getCountEmployees} from "./api";
import {DataItem} from "../../models";
import {employeeIcon, salaryIcon} from "../../icons";
import Colors from "../../constants/colors";

function* responseCheckerAndSetError(response, message) {
    if (response.status !== 200) {
        yield put(companyActions.endLoading());

        const errMessage = getResponseErrorText(response, message);

        yield put(companyActions.setError(errMessage));
        console.error(errMessage);
        yield cancel();
    }
}

function* fetchCompanyDataWorker() {
    try {
        const [responseAvg, responseCount] = yield all([
            call(getAvgSalary),
            call(getCountEmployees)
        ]);

        yield responseCheckerAndSetError(responseAvg, 'Не удалось загрузить данные о средней зарплате.');
        yield responseCheckerAndSetError(responseCount, 'Не удалось загрузить данные о количестве сотрудников.');

        const avgSalaryOnDay = responseAvg.data;
        const countEmployee = responseCount.data;

        yield put(companyActions.setCountEmployees(new DataItem("countEmployee", "Количество сотрудников",
            countEmployee, employeeIcon, Colors.orange)));

        yield put(companyActions.setAvgSalaryOnDay(new DataItem("avgSalaryOnDay", "Средняя зарплата за день",
            `${avgSalaryOnDay}р`, salaryIcon, Colors.primary)));

    } catch (err) {
        yield put(companyActions.setError(err.message));
    }
    yield put(companyActions.endLoading());
}

export default function* watchCompany() {
    yield takeLatest(COMPANY_TYPES.FETCH_COMPANY_DATA, fetchCompanyDataWorker);
}
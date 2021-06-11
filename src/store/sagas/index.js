import { all } from 'redux-saga/effects';

import authSaga from "./authSaga";
import companySaga from "./companySaga";
import reportSaga from "./reportSaga";


export function* rootSaga() {
    yield all([
        authSaga(),
        companySaga(),
        reportSaga()
    ]);
}
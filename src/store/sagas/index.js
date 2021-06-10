import { all } from 'redux-saga/effects';

import authSaga from "./authSaga";
import companySaga from "./companySaga";


export function* rootSaga() {
    yield all([
        authSaga(),
        companySaga()
    ]);
}
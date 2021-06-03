import axios from "axios";
import {takeLatest, put, call} from "redux-saga/effects";

import {AUTH_TYPES} from "../../constants/types";
import {authActions} from "../action-creators";
import {getResponseErrorText} from "../../util/request-config";
import {User} from "../../models";

function* fetchUserProfile() {
    try {
        yield put(authActions.startLoading());
        const response = yield call(() => axios.get('/api/auth/profile'));
        if (response.status !== 200) {
            yield put(authActions.endLoading());

            return put(authActions.setError(
                getResponseErrorText(response, 'Не удалось получить пользователя')
            ));
        }
        yield put(authActions.setUser(
            User.of(response.data))
        );
    } catch (err) {
        yield put(authActions.setError(
            err.message
        ));
    }
    yield put(authActions.endLoading());
}

function* watchFetchUserProfile() {
    yield takeLatest(AUTH_TYPES.FETCH_USER, fetchUserProfile);
}
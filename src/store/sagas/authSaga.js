import {call, cancel, put, takeLatest} from "redux-saga/effects";

import {AUTH_TYPES} from "../../constants/types";
import {authActions} from "../action-creators";
import {getProfile, loadTokens, logIn, saveTokens} from "./api";
import {getResponseErrorText, setTokenHeader} from "../../util/request-config";
import {User} from "../../models";


function* responseCheckerAndSetError(response, message) {
    if (response.status !== 200) {
        yield put(authActions.endLoading());

        const errMessage = getResponseErrorText(response, message);

        yield put(authActions.setError(errMessage));
        console.error(errMessage);
        yield cancel();
    }
}

function* fetchUserProfileWorker() {
    try {
        yield put(authActions.startLoading());
        const response = yield call(getProfile);
        if (response.status !== 200) {
            yield put(authActions.endLoading());

            console.error(getResponseErrorText(response, 'Не удалось получить пользователя'));
            yield cancel();
        }
        yield put(authActions.setUser(
            User.of(response.data))
        );
    } catch (err) {
        console.error(err.message);
    }
    yield put(authActions.endLoading());
}

function* logInUserWorker({payload})  {
    if (payload.email.trim().length === 0 || payload.password.trim().length === 0) {
        yield put(authActions.setError('Все поля должны быть заполнены'));
        yield cancel();
    }
    try {
        yield put(authActions.setError(null));
        yield put(authActions.startLoading());
        const response = yield call(logIn, payload.email, payload.password);

        yield responseCheckerAndSetError(response, 'Не удалось получить пользователя!');

        const {access:accessToken, refresh:refreshToken} = response.data;
        yield call(saveTokens, accessToken, refreshToken)
        yield put(authActions.fetchUser());
    } catch (err) {
        yield put(authActions.setError(err.message));
        console.error(err.message);
    }
    yield put(authActions.endLoading());
}

function* tryAutoLoginWorker() {
    try {
        const tokens = loadTokens();
        console.log(tokens)
        if (tokens) {
            setTokenHeader(tokens.accessToken);
            // or yield fetchUserProfileWorker()
            yield call(fetchUserProfileWorker);
        }
        yield put(authActions.finishAutoLogin());
    } catch (err) {
        console.error(err.message);
    }
}

export default function* watchAuth() {
    yield takeLatest(AUTH_TYPES.FETCH_USER, fetchUserProfileWorker);
    yield takeLatest(AUTH_TYPES.LOG_IN, logInUserWorker);
    yield takeLatest(AUTH_TYPES.TRY_AUTO_LOGIN, tryAutoLoginWorker)
}
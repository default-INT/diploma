import {takeLatest, all, put, call, cancel} from "redux-saga/effects";

import {AUTH_TYPES} from "../../constants/types";
import {authActions} from "../action-creators";
import {loadTokens, saveTokens, getProfile, logIn} from "./api";
import {getResponseErrorText, setTokenHeader} from "../../util/request-config";
import {User} from "../../models";

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

/**
 *
 * @param payload {object}
 * @returns {Generator<SimpleEffect<"PUT", PutEffectDescriptor<{type: string}>>, void, *>}
 */
export function* logInUserWorker({payload})  {
    try {
        yield put(authActions.startLoading());
        const response = yield call(logIn);
        if (response.status !== 200) {
            yield put(authActions.endLoading());
            console.error(getResponseErrorText(response, 'Не удалось получить пользователя'));
            yield cancel();
        }
        const {accessToken, refreshToken} = response.data;
        yield all([
            call(saveTokens, accessToken, refreshToken),
            put(authActions.fetchUser())
        ]);
    } catch (err) {
        console.error(err.message);
    }
    yield put(authActions.endLoading());
}

export function* tryAutoLogin() {
    try {
        const tokens = loadTokens();
        if (tokens) {
            setTokenHeader(tokens.accessToken);
            yield put(authActions.fetchUser())
        }
        yield put(authActions.tryAutoLogin());
    } catch (err) {
        console.error(err.message);
    }
}

export default function* watchAuth() {
    yield takeLatest(AUTH_TYPES.FETCH_USER, fetchUserProfileWorker);
    yield takeLatest(AUTH_TYPES.LOG_IN, logInUserWorker);
}
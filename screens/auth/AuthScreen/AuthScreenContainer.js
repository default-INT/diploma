import React, {useState, useCallback, useReducer} from "react";
import {useDispatch, useSelector} from "react-redux";

import AuthScreenView from "./AuthScreenView";
import {formReducer} from "../../../store/reducers";
import {Alert} from "react-native";
import {FORM_INPUT_UPDATE} from "../../../constants/types";
import {authActions} from "../../../store/actions";


const AuthScreenContainer = props => {
    const [loading, setLoading] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );


    const dispatch = useDispatch();


    const logInClick = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Неверные данные!', 'Проверте данные на корректный ввод!.', [
                { text: 'Ок' }
            ]);
            return;
        }
        setLoading(true);
        try {
            await dispatch(authActions.logInUser(formState.inputValues.email, formState.inputValues.password))
        } catch (err) {
            Alert.alert('Ошибка!', err.message, [
                { text: 'Ок' }
            ]);
        }
        setLoading(false);
    }, [dispatch, formState, loading, setLoading]);

    return (
        <AuthScreenView
            logInClick={logInClick}
            formState={formState}
            inputChangeHandler={inputChangeHandler}
            loading={loading}
        />
    )
}

export const authScreenOptions = navData => {
    return {
        headerTitle: 'Pallet prod.'
    }
}

export default AuthScreenContainer;
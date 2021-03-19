import React, {useCallback, useReducer, useState, useEffect, useLayoutEffect} from "react";
import {View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';

import {Input} from "../../components"
import {employeeActions} from "../../store/actions"
import {MaterialHeaderButton} from "../../components/UI";
import Colors from "../../constants/colors";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditEmployeeScreen = props => {
    const [error, setError] = useState();

    const employeeId = props.route.params.employeeId;
    const editedEmployee = useSelector(state => state.employees.employees.find(employee => employee.id === employeeId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            firstName: editedEmployee ? editedEmployee.firstName : '',
            lastName: editedEmployee ? editedEmployee.lastName : '',
            secondName: editedEmployee ? editedEmployee.secondName : '',
            birthdayYear: editedEmployee ? editedEmployee.birthdayYear + '' : '',
            phoneNumber: editedEmployee ? editedEmployee.phoneNumber : ''
        },
        inputValidities: {
            firstName: !!editedEmployee,
            lastName: !!editedEmployee,
            secondName: !!editedEmployee,
            birthdayYear: !!editedEmployee,
            phoneNumber: !!editedEmployee
        },
        formIsValid: !!editedEmployee
    });

    useEffect(() => {
        if (error) {
            Alert.alert('Произошла ошибка!', error, [{ text: 'Ок' }]);
        }
    }, [error]);

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Неверные данные!', 'Проверте данные на корректный ввод!.', [
                { text: 'Ок' }
            ]);
            return;
        }
        setError(null);
        try {
            if (editedEmployee) {
                dispatch(employeeActions.updateEmployee({
                    id: employeeId,
                    ...formState.inputValues,
                    birthdayYear: +formState.inputValues.birthdayYear
                }))
            } else {
                dispatch(employeeActions.addEmployees({
                    ...formState.inputValues,
                    birthdayYear: +formState.inputValues.birthdayYear
                }))
            }
        } catch (err) {
            setError(err.message)
        }
        props.navigation.goBack();
    }, [dispatch, employeeId, formState]);

    // useEffect(() => {
    //     props.navigation.setParams({ ...formState.inputValues });
    // }, [submitHandler]);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: employeeActions ? 'Редактирование' : 'Добавление',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={submitHandler.bind(this)}
                />
            </HeaderButtons>
        })
    }, [submitHandler])

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

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id='firstName'
                            label='Введите полное имя'
                            errorText='Введите корректное имя!'
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.firstName}
                            initiallyValid={formState.inputValidities.firstName}
                            required
                        />
                        <Input
                            id='lastName'
                            label='Введите фамилию'
                            errorText='Введите корректную фамилию!'
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.lastName}
                            initiallyValid={formState.inputValidities.lastName}
                            required
                        />
                        <Input
                            id='secondName'
                            label='Введите отчество'
                            errorText='Введите корректное отчество!'
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.secondName}
                            initiallyValid={formState.inputValidities.secondName}
                            required
                        />
                        <Input
                            id='birthdayYear'
                            label='Введите год рождения'
                            errorText='Введите корректный год рождения!'
                            keyboardType="numeric"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.birthdayYear}
                            initiallyValid={formState.inputValidities.birthdayYear}
                            min={1950}
                            max={new Date().getFullYear() - 10}
                            required
                        />
                        <Input
                            id='phoneNumber'
                            label='Введите номер телефона'
                            errorText='Введите корректный номер телефона!'
                            keyboardType="phone-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.phoneNumber}
                            initiallyValid={formState.inputValidities.phoneNumber}
                            required
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export const editEmployeeOptions = navData => {
    return {
        headerTitle: 'Редактирование',
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 20,
    },
    screen: {
        backgroundColor: Colors.white,
        flex: 1
    }
})

export default EditEmployeeScreen;
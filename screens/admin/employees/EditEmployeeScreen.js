import React, {useCallback, useEffect, useReducer} from "react";
import {ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from 'react-redux';

import {Input} from "../../../components";
import {MaterialHeaderButton} from "../../../components/UI";
import {employeeActions} from "../../../store/actions";
import {formReducer} from "../../../store/reducers";
import {FORM_INPUT_UPDATE} from "../../../constants/types";
import Colors from "../../../constants/colors";

const EditEmployeeScreen = props => {

    const employeeId = props.route.params.employeeId;
    const editedEmployee = useSelector(state => state.employees.employees.find(employee => employee.id === employeeId));
    const {error, loading} = useSelector(state => state.employees);
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
        props.navigation.goBack();
    }, [dispatch, employeeId, formState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: editedEmployee ? 'Редактирование' : 'Добавление',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={submitHandler.bind(this)}
                />
            </HeaderButtons>
        })
    }, [submitHandler]);

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

    if (loading) {
        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

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
    },
    loadingScreen: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditEmployeeScreen;
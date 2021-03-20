import React, {useState, useReducer, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, CheckBox, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import { Input } from "../../components";
import { MaterialHeaderButton } from "../../components/UI";
import { positionActions } from "../../store/actions";
import { formReducer } from "../../store/reducers";
import { FORM_INPUT_UPDATE } from "../../constants/types";
import Colors from "../../constants/colors";


const EditPositionScreen = props => {
    const [error, setError] = useState();

    const positionId = props.route.params.positionId;
    const editedPosition = useSelector(state => state.positions.availablePositions.find(position => position.id === positionId));

    const [isPallet, setIsPallet] = useState(editedPosition ? editedPosition.isPallet : false);
    const [isStorage, setIsStorage] = useState(editedPosition ? editedPosition.isStorage : false);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: editedPosition ? editedPosition.name : '',
            itemTariff: editedPosition ? editedPosition.itemTariff + '' : '',
            itemName: editedPosition ? editedPosition.itemName : ''
        },
        inputValidities: {
            name: !!editedPosition,
            itemTariff: !!editedPosition,
            itemName: !!editedPosition,
        },
        formIsValid: !!editedPosition
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

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Неверные данные!', 'Проверте данные на корректный ввод!.', [
                { text: 'Ок' }
            ]);
            return;
        }
        setError(null);
        try {
            if (editedPosition) {
                dispatch(positionActions.updatePosition({
                    id: positionId,
                    ...formState.inputValues,
                    itemTariff: +formState.inputValues.itemTariff,
                    isPallet: isPallet,
                    isStorage: isStorage
                }))
            } else {
                dispatch(positionActions.addPosition({
                    ...formState.inputValues,
                    itemTariff: +formState.inputValues.itemTariff,
                    isPallet: isPallet,
                    isStorage: isStorage
                }))
            }
        } catch (err) {
            setError(err.message)
        }
        props.navigation.goBack();
    }, [dispatch, positionId, formState, isPallet, isStorage]);

    useEffect(() => {
        if (error) {
            Alert.alert('Произошла ошибка!', error, [{ text: 'Ок' }]);
        }
    }, [error]);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: editedPosition ? 'Редактирование тарифа' : 'Добавление тарифа',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={submitHandler.bind(this)}
                />
            </HeaderButtons>
        })
    }, [submitHandler]);

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id='name'
                            label='Введите название тарифа'
                            errorText='Введите корректное название!'
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.name}
                            initiallyValid={formState.inputValidities.name}
                            required
                        />
                        <Input
                            id='itemTariff'
                            label='Введите значение тарифа'
                            errorText='Введите корректное значение тарифа!'
                            keyboardType="number-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.itemTariff}
                            initiallyValid={formState.inputValidities.itemTariff}
                            min={0}
                            required
                        />
                        <Input
                            id='itemName'
                            label='Введите единицу измерения'
                            errorText='Введите корректное единицу измерения!'
                            keyboardType="default"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.itemName}
                            initiallyValid={formState.inputValidities.itemName}
                            required
                        />
                        <View style={styles.checkboxContainer}>
                            <Text>
                                Поддоны
                            </Text>
                            <CheckBox
                                color={Colors.primary}
                                value={isPallet}
                                onValueChange={setIsPallet}
                            />
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Text>
                                Ввести учёт на складе
                            </Text>
                            <CheckBox
                                color={Colors.primary}
                                value={isStorage}
                                onValueChange={setIsStorage}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    form: {
        padding: 20,
    },
    screen: {
        backgroundColor: Colors.white,
        flex: 1
    }
});

export default EditPositionScreen;
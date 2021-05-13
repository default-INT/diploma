import React, {useEffect, useState, useCallback} from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import AddUnloadingScreenView from "./AddUnloadingScreenView";
import {MaterialHeaderButton} from "../../../components/UI";
import {positionActions, storageActions} from "../../../store/actions";
import {Alert} from "react-native";

const AddUnloadingScreenContainer = props => {
    const {
        navigation
    } = props;

    const [unloadingDate, setUnloadingDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formState, setFormState] = useState(null)
    const [addLoading, setAddLoading] = useState(false);
    const {availablePositions, loading, error} = useSelector(state => state.positions);
    const dispatch = useDispatch();

    const storagePositions = availablePositions.filter(pos => pos.isStorage);

    const dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || unloadingDate;
        setShowDatePicker(false);
        setUnloadingDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setFullYear(currentDate.getFullYear());
            newDate.setMonth(currentDate.getMonth());
            newDate.setDate(currentDate.getDate());
            return newDate;
        });
    };

    const timeOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || unloadingDate;
        setShowDatePicker(false);
        setUnloadingDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setHours(currentDate.getHours());
            newDate.setMinutes(currentDate.getMinutes());
            return newDate;
        });
    };

    const changeFormState = (key, value) => {
        setFormState(prevState => {
            const newState = {...prevState};
            newState[key] = value;
            return newState;
        });
    };

    const addUnloadingEvent = useCallback(async () => {
        setAddLoading(true);
        try {
            await dispatch(storageActions.addUnloadingEvent({
                date: unloadingDate,
                formState
            }));
            navigation.goBack();
        } catch (err) {
            Alert.alert('Ошибка', err.message, [{text: 'Ok'}])
        }
        setAddLoading(false);
    }, [formState, unloadingDate, dispatch, setUnloadingDate, setFormState]);

    const loadPosition = useCallback(async () => {
        await dispatch(positionActions.fetchPosition())
        const newState = {}
        storagePositions.map(pos => pos.id).forEach(key => {
            newState[key] = ''
        });
        setFormState(newState);
    }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                    <Item
                        title="Add"
                        iconName="save"
                        onPress={addUnloadingEvent.bind(this)}
                    />
                </HeaderButtons>
            )
        })
    }, [addUnloadingEvent])

    useEffect(() => {
        loadPosition();
    }, [navigation]);

    const onShowDatePicker = () => {
        setShowDatePicker(true)
    }

    return (
        <AddUnloadingScreenView
            storagePositions={storagePositions}
            loading={loading}
            error={error}

            formState={formState}
            changeFormState={changeFormState}
            addLoading={addLoading}

            timeOnChange={timeOnChange}
            unloadingDate={unloadingDate}
            showDatePicker={showDatePicker}
            onShowDatePicker={onShowDatePicker}
            dateOnChange={dateOnChange}
        />
    )
};

export const addUnloadingScreenOptions = navData => {
    return {
        headerTitle: 'Добавление выгрузки со склада',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add"
                    iconName="save"
                />
            </HeaderButtons>
        )
    }
}

export default AddUnloadingScreenContainer;
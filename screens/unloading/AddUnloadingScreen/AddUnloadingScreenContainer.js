import React, {useEffect, useState} from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import AddUnloadingScreenView from "./AddUnloadingScreenView";
import {MaterialHeaderButton} from "../../../components/UI";
import {positionActions} from "../../../store/actions";

const AddUnloadingScreenContainer = props => {
    const {
        navigation
    } = props;

    const [unloadingDate, setUnloadingDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const {availablePositions, loading, error} = useSelector(state => state.positions);
    const dispatch = useDispatch();

    const storagePositions = availablePositions.filter(pos => pos.isStorage);

    const dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || unloadingDate;
        setShowDatePicker(false);
        setUnloadingDate(currentDate);
    };

    useEffect(() => {
        dispatch(positionActions.fetchPosition())
    }, [navigation]);

    const onShowDatePicker = () => {
        setShowDatePicker(true)
    }

    return (
        <AddUnloadingScreenView
            storagePositions={storagePositions}
            loading={loading}
            error={error}

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
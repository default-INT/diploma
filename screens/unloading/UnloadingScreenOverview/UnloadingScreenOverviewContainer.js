import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UnloadingScreenOverviewView from "./UnloadingScreenOverviewView";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {MaterialHeaderButton} from "../../../components/UI";
import {companyActions, storageActions} from "../../../store/actions";
import {Alert} from "react-native";


const UnloadingScreenOverviewContainer = ({navigation, ...props}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {unloadingEvents} = useSelector(state => state.storage)
    const dispatch = useDispatch();

    const loadUnloadingEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(storageActions.fetchUnloadingEvents());
        } catch (err) {
            console.warn(err.message);
            Alert.alert('Error', err.message, [{text: 'Ok'}]);
            setError(err.message);
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        return navigation.addListener('focus',  () => {
            loadUnloadingEvents();
        });

    }, [navigation]);

    return (
        <UnloadingScreenOverviewView
            loading={loading}
            error={error}
            unloadingEvents={unloadingEvents}
        />
    )
}


export const unloadingScreenOverviewOptions = navData => {
    return {
        headerTitle: 'Выгрузки со склада',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add"
                    iconName="add-circle-outline"
                    onPress={() => {
                        navData.navigation.navigate('AddUnloading');
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default UnloadingScreenOverviewContainer;
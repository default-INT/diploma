import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons"

import {companyActions, storageActions} from "../../../store/actions";
import {MaterialHeaderButton} from "../../../components/UI";
import StorageMainScreenView from "./StorageMainScreenView";

const MainScreenContainer = ({navigation, ...props}) => {
    const storageData = useSelector(state => state.storage);
    const [storageLoading, setStorageLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const loadStorage = useCallback(async () => {
        setStorageLoading(true);
        setError(null);
        try {
            await dispatch(storageActions.fetchActualStorage());
        } catch (err) {
            setError(err.message);
        }
        setStorageLoading(false);
    }, [storageData, dispatch, setStorageLoading]);

    useEffect(() => {
        return navigation.addListener('focus',  () => {
            loadStorage();
            dispatch(companyActions.fetchAllCompanyData());
        });
    }, [navigation]);

    return (
        <StorageMainScreenView
            storageData={storageData}
            storageLoading={storageLoading}
            error={error}
        />
    )
}

export const storageMainScreenOptions = navData => {
    return {
        headerTitle: 'Склад',
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
                    title="Edit"
                    iconName="edit"
                    onPress={() => ''}
                />
            </HeaderButtons>
        )
    }
}

export default MainScreenContainer;
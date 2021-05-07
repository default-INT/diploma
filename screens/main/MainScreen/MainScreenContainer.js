import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons"

import MainScreenView from "./MainScreenView";
import {companyActions, storageActions} from "../../../store/actions";
import {MaterialHeaderButton} from "../../../components/UI";

const MainScreenContainer = ({navigation, ...props}) => {
    const companyData = useSelector(state => state.company);
    const {actualStorage} = useSelector(state => state.storage);
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
    }, [dispatch, setStorageLoading]);

    useEffect(() => {
        return navigation.addListener('focus',  () => {
            loadStorage();
            dispatch(companyActions.fetchAllCompanyData());
        });
    }, [navigation]);
    return (
        <MainScreenView
            companyData={companyData}
            actualStorage={actualStorage}
            storageLoading={storageLoading}
            error={error}
        />
    )
}

export const mainScreenOptions = navData => {
    return {
        headerTitle: 'Pallet prod.',
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
        )
    }
}

export default MainScreenContainer;
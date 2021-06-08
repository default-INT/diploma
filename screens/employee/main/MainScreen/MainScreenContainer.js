import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import MainScreenView from "./MainScreenView";
import {userActions} from "../../../../store/actions-creators";
import {MaterialHeaderButton} from "../../../../components/UI";


const MainScreenContainer = ({navigation, ...props}) => {
    const {avgMonthSalary, totalMonthSalary, loading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const loadData = () => {
        dispatch(userActions.fetchUserData());
    };

    useEffect(() => {
        return  navigation.addListener('focus', () => {
            loadData();
        });
    }, [navigation]);

    return (
        <MainScreenView
            avgMonthSalary={avgMonthSalary}
            totalMonthSalary={totalMonthSalary}
            loading={loading}
            error={error}
            loadData={loadData}
        />
    )
};


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
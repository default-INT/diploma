import React from "react";

import MainScreenView from "./MainScreenView";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {MaterialHeaderButton} from "../../../../components/UI";


const MainScreenContainer = props => {
    return (
        <MainScreenView/>
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
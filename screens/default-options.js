import React from "react";
import {MaterialHeaderButton} from "../components/UI";
import {HeaderButtons, Item} from "react-navigation-header-buttons";


export const HeaderToggleButton = ({navData}) => {
    return (
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
import React from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import StatisticStorageScreenView from "./StatisticStorageScreenView";
import {HeaderToggleButton} from "../../../default-options";
import {MaterialHeaderButton} from "../../../../components/UI";

const StatisticStorageScreenContainer = props => {
    return (
        <StatisticStorageScreenView />
    )
}

export const statisticStorageScreenOptions = navData => {
    return {
        headerTitle: 'Итоги',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        )
    }
}

export default StatisticStorageScreenContainer;
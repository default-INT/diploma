import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../default-options";
import {MaterialHeaderButton} from "../../../components/UI";
import StatisticEmployeeScreenView from "./StatisticEmployeeScreenView";

const StatisticEmployeeScreenContainer = props => {

    return (
        <StatisticEmployeeScreenView
        />
    )
}

export const statisticEmployeeScreenOptions = navData => {
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

export default StatisticEmployeeScreenContainer;
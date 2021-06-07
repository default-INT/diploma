import React from "react";

import StatisticScreenView from "./StatisticScreenView";
import {HeaderToggleButton} from "../../../default-options";

const StatisticScreenContainer = props => {
    return (
        <StatisticScreenView />
    )
};

export const statisticMainScreenOptions = navData => {
    return {
        headerTitle: 'Итоги',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

export default StatisticScreenContainer;
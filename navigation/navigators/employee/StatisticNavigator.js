import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {StatisticScreen} from "../../../screens/employee/statistics";
import {statisticMainScreenOptions} from "../../../screens/employee/statistics/options";
import {defaultStackNavOptions} from "../../styles";

const ReportStackNavigator = createStackNavigator()

export const StatisticNavigator = () => {
    return (
        <ReportStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <ReportStackNavigator.Screen
                name="StatisticScreen"
                component={StatisticScreen}
                options={statisticMainScreenOptions}
            />
        </ReportStackNavigator.Navigator>
    );
};
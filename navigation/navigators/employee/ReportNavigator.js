import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {ReportScreen} from "../../../screens/employee/reports";
import {reportsOptions} from "../../../screens/employee/reports/options";
import {defaultStackNavOptions} from "../../styles";

const ReportStackNavigator = createStackNavigator()

export const ReportNavigator = () => {
    return (
        <ReportStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <ReportStackNavigator.Screen
                name="ReportScreen"
                component={ReportScreen}
                options={reportsOptions}
            />
        </ReportStackNavigator.Navigator>
    );
};
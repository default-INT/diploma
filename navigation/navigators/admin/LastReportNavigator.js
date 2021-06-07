import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {lastReportsOptions} from "../../../screens/admin/reports/LastReportsScreen";
import {
    EditEmployeeReportScreen,
    EditReportScreen,
    EditWorkItemReportScreen,
    LastReportsScreen
} from "../../../screens/admin/reports";
import {defaultStackNavOptions} from "../../styles";

const ReportStackNavigator = createStackNavigator();

export const LastReportNavigator = () => {
    return (
        <ReportStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <ReportStackNavigator.Screen
                name="LastReports"
                component={LastReportsScreen}
                options={lastReportsOptions}
            />
            <ReportStackNavigator.Screen
                name="EditReport"
                component={EditReportScreen}
            />
            <ReportStackNavigator.Screen
                name="EditEmployeeReport"
                component={EditEmployeeReportScreen}
            />
            <ReportStackNavigator.Screen
                name="EditWorkItemReport"
                component={EditWorkItemReportScreen}
            />
        </ReportStackNavigator.Navigator>
    )
}
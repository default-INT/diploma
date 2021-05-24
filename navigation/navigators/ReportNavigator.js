import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {lastReportsOptions} from "../../screens/reports/LastReportsScreen";
import {calendarOptions} from "../../screens/reports/CalendarReportsScreen";
import {
    CalendarReportsScreen,
    EditEmployeeReportScreen,
    EditReportScreen,
    EditWorkItemReportScreen,
    LastReportsScreen
} from "../../screens/reports";
import {defaultStackNavOptions} from "../styles";
import Colors from "../../constants/colors";

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

const CalendarStackNavigator = createStackNavigator();

export const CalendarReportNavigator = () => {
    return (
        <CalendarStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <CalendarStackNavigator.Screen
                name="CalendarReports"
                component={CalendarReportsScreen}
                options={calendarOptions}
            />
            <CalendarStackNavigator.Screen
                name="EditReport"
                component={EditReportScreen}
            />
            <CalendarStackNavigator.Screen
                name="EditEmployeeReport"
                component={EditEmployeeReportScreen}
            />
            <ReportStackNavigator.Screen
                name="EditWorkItemReport"
                component={EditWorkItemReportScreen}
            />
        </CalendarStackNavigator.Navigator>
    )
}

const ReportTabNavigator = createBottomTabNavigator();

export const ReportNavigator = () => {
    return (
        <ReportTabNavigator.Navigator
            activeColor={Colors.white}
            layzy={true}
            inactiveColor={Colors.whitesmoke}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: Colors.white,
                inactiveTintColor: Colors.whitesmoke,
                inactiveBackgroundColor: Colors.primary,
                activeBackgroundColor: Colors.primary,
                tabStyle: {
                    paddingTop: 10
                },
                labelStyle: {
                    fontSize: 10,
                    paddingBottom: 5
                }
            }}
        >
            <ReportTabNavigator.Screen
                name="LastReportsScreen"
                component={LastReportNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <MaterialIcons name="view-list" size={tabInfo.focused ? 25 : 18} color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;
                    },
                    tabBarLabel: 'Последние отчеты'
                }}
            />
            <ReportTabNavigator.Screen
                name="CalendarReportsScreen"
                component={CalendarReportNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <Ionicons name="md-calendar" size={tabInfo.focused ? 25 : 18} color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;
                    },
                    tabBarLabel: 'Календарь'
                }}
            />
        </ReportTabNavigator.Navigator>
    )
}
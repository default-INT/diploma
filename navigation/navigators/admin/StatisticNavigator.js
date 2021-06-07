import {createStackNavigator} from "@react-navigation/stack";
import {StatisticEmployeeScreen, StatisticMainScreen, StatisticStorageScreen} from "../../../screens/admin/statistics";
import {statisticMainScreenOptions} from "../../../screens/admin/statistics/StatisticMainScreen";
import {statisticEmployeeScreenOptions} from "../../../screens/admin/statistics/StatisticEmployeeScreen";
import {statisticStorageScreenOptions} from "../../../screens/admin/statistics/StatisticStorageScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Colors from "../../../constants/colors";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {defaultStackNavOptions} from "../../styles";

const StatisticMainStackNavigator = createStackNavigator();

export const StatisticMainNavigator = () => {
    return (
        <StatisticMainStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <StatisticMainStackNavigator.Screen
                name="StatisticMain"
                component={StatisticMainScreen}
                options={statisticMainScreenOptions}
            />
        </StatisticMainStackNavigator.Navigator>
    )
};

const StatisticEmployeeStackNavigator = createStackNavigator();

export const StatisticEmployeeNavigator = () => {
    return (
        <StatisticEmployeeStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <StatisticEmployeeStackNavigator.Screen
                name="StatisticEmployee"
                component={StatisticEmployeeScreen}
                options={statisticEmployeeScreenOptions}
            />
        </StatisticEmployeeStackNavigator.Navigator>
    )
};

const StatisticStorageStackNavigator = createStackNavigator();

export const StatisticStorageNavigator = () => {
    return (
        <StatisticStorageStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <StatisticStorageStackNavigator.Screen
                name="StatisticStorage"
                component={StatisticStorageScreen}
                options={statisticStorageScreenOptions}
            />
        </StatisticStorageStackNavigator.Navigator>
    )
};

const StatisticTabNavigator = createBottomTabNavigator();

export const StatisticNavigator = () => {
    return (
        <StatisticTabNavigator.Navigator
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
            <StatisticTabNavigator.Screen
                name="StatisticMainNavigator"
                component={StatisticMainNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <Ionicons name="md-calendar" size={tabInfo.focused ? 25 : 18}
                                         color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;
                    },
                    tabBarLabel: 'По дате'
                }}
            />
            <StatisticTabNavigator.Screen
                name="StatisticEmployeeNavigator"
                component={StatisticEmployeeNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <MaterialIcons name="person" size={tabInfo.focused ? 25 : 18}
                                              color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;
                    },
                    tabBarLabel: 'По сотруднику'
                }}
            />
            {/*<StatisticTabNavigator.Screen*/}
            {/*    name="StatisticStorageNavigator"*/}
            {/*    component={StatisticStorageNavigator}*/}
            {/*    options={{*/}
            {/*        tabBarIcon: tabInfo => {*/}
            {/*            return <Ionicons name="construct" size={tabInfo.focused ? 25 : 18}*/}
            {/*                             color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;*/}
            {/*        },*/}
            {/*        tabBarLabel: 'По складу'*/}
            {/*    }}*/}
            {/*/>*/}
        </StatisticTabNavigator.Navigator>
    )
}
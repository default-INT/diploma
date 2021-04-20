import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Image, SafeAreaView, StyleSheet, View, Text} from "react-native";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import {MainScreen} from "../screens";
import {mainScreenOptions} from "../screens/options";
import {lastReportsOptions, calendarOptions} from "../screens/reports/options";
import {employeesOptions, employeeDetailsOptions, editEmployeeOptions} from "../screens/employees/options";
import {positionScreenOptions} from "../screens/positions/options";
import {EditEmployeeReportScreen, EditWorkItemReportScreen, EditReportScreen, CalendarReportsScreen, LastReportsScreen} from "../screens/reports";
import {EmployeesScreen, EmployeeDetailsScreen, EditEmployeeScreen} from "../screens/employees";
import {PositionsScreen, EditPositionScreen} from "../screens/positions";
import {StatisticMainScreen, StatisticEmployeeScreen, StatisticStorageScreen} from "../screens/statistics";
import {statisticStorageScreenOptions, statisticEmployeeScreenOptions, statisticMainScreenOptions} from "../screens/statistics/options"
import Colors from "../constants/colors";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 5,
    },
    headerTitleStyle: {
        color: Colors.white,
    },
    headerBackTitleStyle: {

    },
    headerTintColor: Colors.white,
    headerTitle: ''
};

const styles = StyleSheet.create({
    drawer: { flex: 1, paddingTop: 30 },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 80,
        height: 80
    }
})

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <MainStackNavigator.Screen
                name="Main"
                component={MainScreen}
                options={mainScreenOptions}
            />
        </MainStackNavigator.Navigator>
    )
}


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
        </CalendarStackNavigator.Navigator>
    )
}

//TODO: for IOS other API
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

const EmployeesStackNavigator = createStackNavigator()

export const EmployeeNavigator = () => {
    return (
        <EmployeesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <EmployeesStackNavigator.Screen
                name="Employees"
                component={EmployeesScreen}
                options={employeesOptions}
            />
            <EmployeesStackNavigator.Screen
                name="EmployeeDetails"
                component={EmployeeDetailsScreen}
                options={employeeDetailsOptions}
            />
            <EmployeesStackNavigator.Screen
                name="EditEmployee"
                component={EditEmployeeScreen}
                options={editEmployeeOptions}
            />
        </EmployeesStackNavigator.Navigator>
    )
}


const PositionStackNavigator = createStackNavigator()

export const PositionNavigator = () => {
    return (
        <PositionStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <PositionStackNavigator.Screen
                name="Positions"
                component={PositionsScreen}
                options={positionScreenOptions}
            />
            <PositionStackNavigator.Screen
                name="EditPosition"
                component={EditPositionScreen}
            />
        </PositionStackNavigator.Navigator>
    )
}

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
            <StatisticTabNavigator.Screen
                name="StatisticStorageNavigator"
                component={StatisticStorageNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <Ionicons name="construct" size={tabInfo.focused ? 25 : 18}
                                         color={Colors.white} style={{opacity: tabInfo.focused ? 1 : 0.5}} />;
                    },
                    tabBarLabel: 'По складу'
                }}
            />
        </StatisticTabNavigator.Navigator>
    )
}

const PalletProdDrawerNavigator = createDrawerNavigator();

export const PalletProdNavigator = () => {
    return (
        <PalletProdDrawerNavigator.Navigator
            drawerContent={props => {
                return (
                    <View style={styles.drawer}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={require("../assets/icon.png")} />
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                )
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >

            <PalletProdDrawerNavigator.Screen
                name="Main"
                component={MainNavigator}
                options={{
                    drawerLabel: 'Главное',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="home"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Reports"
                component={ReportNavigator}
                options={{
                    drawerLabel: 'Отчёты',
                    drawerIcon: props => (
                        <Ionicons
                            name="md-calendar"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Employees"
                component={EmployeeNavigator}
                options={{
                    drawerLabel: 'Сотрудники',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="person"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Positions"
                component={PositionNavigator}
                options={{
                    drawerLabel: 'Тарифы',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="work"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Statistic"
                component={StatisticNavigator}
                options={{
                    drawerLabel: 'Статистика',
                    drawerIcon: props => (
                        <MaterialCommunityIcons
                            name="chart-line"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </PalletProdDrawerNavigator.Navigator>
    )
}



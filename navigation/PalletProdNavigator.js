import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Image, SafeAreaView, StyleSheet, View, Text} from "react-native";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

import {MainScreen} from "../screens";
import {mainScreenOptions} from "../screens/options";
import {lastReportsOptions} from "../screens/reports/options";
import {employeesOptions, employeeDetailsOptions, editEmployeeOptions} from "../screens/employees/options";
import {positionScreenOptions} from "../screens/positions/options";
import {EditEmployeeReportScreen, EditReportScreen, CalendarReportsScreen, LastReportsScreen} from "../screens/reports";
import {EmployeesScreen, EmployeeDetailsScreen, EditEmployeeScreen} from "../screens/employees";
import {PositionsScreen, EditPositionScreen} from "../screens/positions";
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
    headerTitle: 'Is screen'
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
                options={lastReportsOptions}
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
const ReportTabNavigator = createMaterialBottomTabNavigator();

export const ReportNavigator = () => {
    return (
        <ReportTabNavigator.Navigator
            activeColor={Colors.white}
            activeTintColor='white'
            shifting={true}
            inactiveColor={Colors.gray}
            barStyle={{ backgroundColor: Colors.primary }}
        >
            <ReportTabNavigator.Screen
                name="LastReportsScreen"
                component={LastReportNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <MaterialIcons name="view-list" size={25} color={Colors.white} />;
                    },
                    tabBarColor: Colors.primary,
                    tabBarLabel: 'Последние отчеты'
                }}
            />
            <ReportTabNavigator.Screen
                name="CalendarReportsScreen"
                component={CalendarReportNavigator}
                options={{
                    tabBarIcon: tabInfo => {
                        return <Ionicons name="md-calendar" size={25} color={Colors.white} />;
                    },
                    tabBarColor: Colors.turquoise,
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
        </PalletProdDrawerNavigator.Navigator>
    )
}



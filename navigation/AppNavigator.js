import React from "react"
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import {createDrawerNavigator} from "react-navigation-drawer"

import {MainScreen} from "../screens"
import {LastReportsScreen} from "../screens/reports"
import Colors from "../constants/colors"


const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 5,
    },
    headerTitleStyle: {
        color: Colors.white
    },
    headerBackTitleStyle: {

    },
    headerTintColor: Colors.white,
    headerTitle: 'Is screen'
};

const MainNavigator = createStackNavigator({
    Main: MainScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const ReportNavigator = createStackNavigator({
    LastReports: LastReportsScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const AppNavigator = createDrawerNavigator({
    Main: MainNavigator,
    Reports: ReportNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(AppNavigator)
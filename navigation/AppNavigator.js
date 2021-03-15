import React from "react"
import {NavigationContainer} from "@react-navigation/native"

import {PalletProdNavigator} from "./PalletProdNavigator"


// const defaultStackNavOptions = {
//     headerStyle: {
//         backgroundColor: Colors.primary,
//         elevation: 5,
//     },
//     headerTitleStyle: {
//         color: Colors.white
//     },
//     headerBackTitleStyle: {
//
//     },
//     headerTintColor: Colors.white,
//     headerTitle: 'Is screen'
// };
//
// const MainNavigator = createStackNavigator({
//     Main: MainScreen
// }, {
//     defaultNavigationOptions: defaultStackNavOptions
// })
//
// const ReportNavigator = createStackNavigator({
//     LastReports: LastReportsScreen
// }, {
//     defaultNavigationOptions: defaultStackNavOptions
// })
//
// const AppNavigator = createDrawerNavigator({
//     Main: MainNavigator,
//     Reports: ReportNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     }
// })

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <PalletProdNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator
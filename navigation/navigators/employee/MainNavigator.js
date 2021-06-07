import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {MainScreen} from "../../../screens/employee/main";
import {mainScreenOptions} from "../../../screens/employee/main";
import {defaultStackNavOptions} from "../../styles";

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <MainStackNavigator.Screen
                name="MainScreen"
                component={MainScreen}
                options={mainScreenOptions}
            />
        </MainStackNavigator.Navigator>
    )
};
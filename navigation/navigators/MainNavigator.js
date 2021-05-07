import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {MainScreen} from "../../screens";
import {mainScreenOptions} from "../../screens/main/MainScreen";
import {defaultStackNavOptions} from "../styles";

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
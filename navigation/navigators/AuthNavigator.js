import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {AuthScreen} from "../../screens/auth";
import {authScreenOptions} from "../../screens/auth/options";
import {defaultStackNavOptions} from "../styles";


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <AuthStackNavigator.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    )
};
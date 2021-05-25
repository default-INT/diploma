import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { useSelector } from 'react-redux';

import {AuthNavigator} from "./navigators";
import RootNavigator from "./RootNavigator";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = props => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    return (
        <NavigationContainer>
            {isAuth && <RootNavigator/>}
            {!isAuth && !didTryAutoLogin && <StartupScreen/>}
            {!isAuth && didTryAutoLogin && <AuthNavigator/>}
        </NavigationContainer>
    )
}

export default AppNavigator
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from 'react-redux';

import {AuthNavigator} from "./navigators/admin";
import RootAdminNavigator from "./RootAdminNavigator";
import StartupScreen from "../screens/StartupScreen";
import RootEmployeeNavigator from "./RootEmployeeNavigator";

/**
 *
 * @param user {User}
 * @returns {JSX.Element}
 * @constructor
 */
const UserNavigator = ({user}) => {
    if (user.isEmployee()) {
        return (
            <RootEmployeeNavigator />
        )
    }
    return (
        <RootAdminNavigator />
    )
}

/**
 *
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const AppNavigator = props => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.authUser);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    return (
        <NavigationContainer>
            {isAuth && <UserNavigator user={user}/>}
            {!isAuth && !didTryAutoLogin && <StartupScreen/>}
            {!isAuth && didTryAutoLogin && <AuthNavigator/>}
        </NavigationContainer>
    )
}

export default AppNavigator
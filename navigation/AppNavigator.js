import React from "react"
import {NavigationContainer} from "@react-navigation/native"

import RootNavigator from "./RootNavigator";

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator
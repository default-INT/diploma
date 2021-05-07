import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {defaultStackNavOptions} from "../styles";
import {UnloadingScreenOverview} from "../../screens/unloading";
import {unloadingScreenOverviewOptions} from "../../screens/unloading/options";

const UnloadingStackNavigator = createStackNavigator();

export const UnloadingNavigator = () => {
    return (
        <UnloadingStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <UnloadingStackNavigator.Screen
                name="StorageMain"
                component={UnloadingScreenOverview}
                options={unloadingScreenOverviewOptions}
            />
        </UnloadingStackNavigator.Navigator>
    )
}
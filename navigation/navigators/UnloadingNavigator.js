import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {defaultStackNavOptions} from "../styles";
import {UnloadingScreenOverview, AddUnloadingScreen} from "../../screens/unloading";
import {unloadingScreenOverviewOptions, addUnloadingScreenOptions} from "../../screens/unloading/options";

const UnloadingStackNavigator = createStackNavigator();

export const UnloadingNavigator = () => {
    return (
        <UnloadingStackNavigator.Navigator screenOptions={defaultStackNavOptions} >
            <UnloadingStackNavigator.Screen
                name="UnloadingMain"
                component={UnloadingScreenOverview}
                options={unloadingScreenOverviewOptions}
            />
            <UnloadingStackNavigator.Screen
                name="AddUnloading"
                component={AddUnloadingScreen}
                options={addUnloadingScreenOptions}
            />
        </UnloadingStackNavigator.Navigator>
    )
}
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {StorageMainScreen} from "../../screens/storage";
import {storageMainScreenOptions} from "../../screens/storage/StorageMainScreen";
import {defaultStackNavOptions} from "../styles";

const StorageStackNavigator = createStackNavigator();

export const StorageNavigator = () => {
    return (
        <StorageStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <StorageStackNavigator.Screen
                name="StorageMain"
                component={StorageMainScreen}
                options={storageMainScreenOptions}
            />
        </StorageStackNavigator.Navigator>
    )
}
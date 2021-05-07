import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {EditPositionScreen, PositionsScreen} from "../../screens/positions";
import {positionScreenOptions} from "../../screens/positions/PositionsScreen";
import {defaultStackNavOptions} from "../styles";

const PositionStackNavigator = createStackNavigator()

export const PositionNavigator = () => {
    return (
        <PositionStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <PositionStackNavigator.Screen
                name="Positions"
                component={PositionsScreen}
                options={positionScreenOptions}
            />
            <PositionStackNavigator.Screen
                name="EditPosition"
                component={EditPositionScreen}
            />
        </PositionStackNavigator.Navigator>
    )
}
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {PositionsScreen} from "../../../screens/employee/positions";
import {positionScreenOptions} from "../../../screens/employee/positions/options";
import {defaultStackNavOptions} from "../../styles";

const PositionStackNavigator = createStackNavigator()

export const PositionNavigator = () => {
    return (
        <PositionStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <PositionStackNavigator.Screen
                name="PositionsScreen"
                component={PositionsScreen}
                options={positionScreenOptions}
            />
        </PositionStackNavigator.Navigator>
    );
};
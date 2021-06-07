import React from "react";

import PositionScreenView from "./PositionScreenView";
import {HeaderToggleButton} from "../../../default-options";

const PositionScreenContainer = props => {
    return (
        <PositionScreenView/>
    )
};


export const positionScreenOptions = navData => {
    return {
        headerTitle: 'Тарифы',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

export default PositionScreenContainer;
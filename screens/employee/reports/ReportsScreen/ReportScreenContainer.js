import React from "react";

import ReportsScreenView from "./ReportsScreenView";
import {HeaderToggleButton} from "../../../default-options";

const ReportScreenContainer = props => {
    return (
        <ReportsScreenView/>
    )
}

export const reportsOptions = navData => {
    return {
        headerTitle: 'Последние отчёты',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

export default ReportScreenContainer;
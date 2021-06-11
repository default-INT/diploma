import React, {useEffect} from "react";

import ReportScreenView from "./ReportScreenView";
import {useDispatch, useSelector} from "react-redux";
import {reportActions} from "../../../store/action-creators";

const ReportScreenContainer = props => {
    const {isLoaded, error, monthlyReports} = useSelector(state => state.reports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reportActions.fetchMonthlyReports(5, 2021))
    }, []);
    return (
        <ReportScreenView
            monthlyReports={monthlyReports}
            isLoaded={isLoaded}
            error={error}
        />
    )
};

export default ReportScreenContainer;
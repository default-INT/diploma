import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../../../store/actions-creators";
import ReportsScreenView from "./ReportsScreenView";
import {HeaderToggleButton} from "../../../default-options";

const ReportScreenContainer = ({navigation, ...props}) => {
    const {userReports, loading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const loadReports = () => {
        dispatch(userActions.fetchUserReports());
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            loadReports();
        });
    }, [navigation]);

    return (
        <ReportsScreenView
            loadData={loadReports}
            userReports={userReports}
            loading={loading}
            error={error}
        />
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
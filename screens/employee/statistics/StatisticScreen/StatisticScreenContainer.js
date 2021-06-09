import React, {useEffect} from "react";

import StatisticScreenView from "./StatisticScreenView";
import {HeaderToggleButton} from "../../../default-options";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../../store/actions-creators";

const StatisticScreenContainer = ({navigation, ...props}) => {
    const {userStatistic, loading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const loadData = () => {
        dispatch(userActions.fetchUserStatistics())
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            loadData();
        });
    }, [navigation]);

    return (
        <StatisticScreenView
            loadData={loadData}

            userStatistic={userStatistic}
            loading={loading}
            error={error}
        />
    )
};

export const statisticMainScreenOptions = navData => {
    return {
        headerTitle: 'Итоги',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

export default StatisticScreenContainer;
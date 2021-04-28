import React, {useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../default-options";
import {MaterialHeaderButton} from "../../../components/UI";
import StatisticMainScreenView from "./StatisticMainScreenView";
import {statisticActions} from "../../../store/actions";

const StatisticMainScreenContainer = props => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date(fromDate.getFullYear(), fromDate.getMonth() + 1,
        fromDate.getDate()));
    const [showDatePicker, setShowDatePicker] = useState('off');
    const [loading, setLoading] = useState(false);

    const {employeeStatistic} = useSelector(state => state.statistics);

    const dispatch = useDispatch();

    const fetchStatistic = useCallback(async () => {
        setLoading(true);
        await dispatch(statisticActions.getEmployeeStatistic(fromDate, toDate));
        setLoading(false);
    }, [fromDate, toDate, dispatch, loading]);

    const fromDateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowDatePicker(false);
        setFromDate(currentDate);
    };

    const toDateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowDatePicker(false);
        setToDate(currentDate);
    };

    const setDatePicker = state => {
        setShowDatePicker(state);
    }

    return (
        <StatisticMainScreenView
            fromDate={fromDate}
            toDate={toDate}
            showDatePicker={showDatePicker}
            fromDateOnChange={fromDateOnChange}
            toDateOnChange={toDateOnChange}
            setDatePicker={setDatePicker}

            loading={loading}
            employeeStatistic={employeeStatistic}
            fetchStatistic={fetchStatistic}
        />
    );
}

export const statisticMainScreenOptions = navData => {
    return {
        headerTitle: 'Итоги',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        )
    }
}

export default StatisticMainScreenContainer;

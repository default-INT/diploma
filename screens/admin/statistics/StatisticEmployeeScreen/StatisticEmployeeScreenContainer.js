import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../../default-options";
import {MaterialHeaderButton} from "../../../../components/UI";
import {employeeActions} from "../../../../store/actions";
import {statisticActions} from "../../../../store/actions";
import StatisticEmployeeScreenView from "./StatisticEmployeeScreenView";

const StatisticEmployeeScreenContainer = props => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const [fromDate, setFromDate] = useState(currentDate);
    const [error, setError] = useState(null);
    const [toDate, setToDate] = useState(new Date(fromDate.getFullYear(), fromDate.getMonth() + 1,
        fromDate.getDate()));
    const [showDatePicker, setShowDatePicker] = useState('off');
    const [loading, setLoading] = useState(false);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);


    const {employees, loading:employeesLoading, error:employeeError} = useSelector(state => state.employees);
    const {statisticByEmployee} = useSelector(state => state.statistics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(employeeActions.fetchEmployees());
    }, []);

    const loadStatisticByEmployee = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(statisticActions.getStatisticByEmployee(fromDate, toDate, selectedEmployeeId));
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
        setLoading(false);
    }, [fromDate, toDate, selectedEmployeeId, dispatch]);

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
        <StatisticEmployeeScreenView
            fromDate={fromDate}
            toDate={toDate}
            showDatePicker={showDatePicker}
            fromDateOnChange={fromDateOnChange}
            toDateOnChange={toDateOnChange}
            setDatePicker={setDatePicker}

            employeeError={employeeError}
            employeesLoading={employeesLoading}
            employees={employees}
            selectedEmployeeId={selectedEmployeeId}
            setSelectedEmployeeId={setSelectedEmployeeId}

            statisticByEmployee={statisticByEmployee}
            loadStatisticByEmployee={loadStatisticByEmployee}

            error={error}
            loading={loading}
        />
    )
}

export const statisticEmployeeScreenOptions = navData => {
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

export default StatisticEmployeeScreenContainer;
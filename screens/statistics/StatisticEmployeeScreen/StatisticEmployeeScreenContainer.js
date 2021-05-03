import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../default-options";
import {MaterialHeaderButton} from "../../../components/UI";
import {employeeActions} from "../../../store/actions";
import StatisticEmployeeScreenView from "./StatisticEmployeeScreenView";
import StatisticMainScreenView from "../StatisticMainScreen/StatisticMainScreenView";

const StatisticEmployeeScreenContainer = props => {
    const [fromDate, setFromDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [toDate, setToDate] = useState(new Date(fromDate.getFullYear(), fromDate.getMonth() + 1,
        fromDate.getDate()));
    const [showDatePicker, setShowDatePicker] = useState('off');
    const [loading, setLoading] = useState(false);


    const {employees, loading:employeesLoading, error:employeeError} = useSelector(state => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(employeeActions.fetchEmployees());
    }, []);

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
            selectedEmployeeId={0}
            setSelectedEmployeeId={() => ''}

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
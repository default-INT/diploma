import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../default-options";
import {MaterialHeaderButton} from "../../../components/UI";
import {Calendar} from "../../../components";
import {reportActions} from "../../../store/actions";

const CalendarReportsScreen = ({navigation, ...props}) => {
    const monthlyReports = useSelector(state => state.reports.monthlyReports);
    const dispatch = useDispatch();

    useEffect(() => {
        return navigation.addListener('focus', () => {
            dispatch(reportActions.createEmptyReport(new Date()));
        });
    }, [navigation]);

    const monthChangeHandler = month => {
        dispatch(reportActions.fetchMonthlyReports(month));
    };

    const onEditReport = report => {
        dispatch(reportActions.selectReport(report));
        navigation.navigate('EditReport', {
            reportId: report.id,
            selectedDate: true,
            month: report.date.getMonth(),
            year: report.date.getFullYear(),
            date: report.date.getDate()
        });
    }

    const onSelectDate = date => {
        navigation.navigate('EditReport', {
            selectedDate: true,
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date.getDate()
        });
    };

    return (<View style={styles.screen}>
        <Calendar monthlyReports={monthlyReports} onSelectDate={onSelectDate} monthChangeHandler={monthChangeHandler} onEditReport={onEditReport} />
    </View>)
}

export const calendarOptions = navData => {
    return {
        headerTitle: 'Календарь',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add"
                    iconName="add-circle-outline"
                    onPress={() => {
                        navData.navigation.navigate('EditReport', {})
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {

    }
})

export default CalendarReportsScreen
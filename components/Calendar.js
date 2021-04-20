import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Ionicons} from "@expo/vector-icons";

import Card from "./Card";
import {MONTH_NAMES} from "../constants";
import TouchableButton from "./UI/TouchableButton";
import {getMonthDates, eqDates} from "../utils";
import Colors from "../constants/colors";
import {reportActions} from "../store/actions";


const CalendarHeader = ({setNextDate, setBeforeDate, currentMonthYear, ...props}) => {
    return (
        <View>
            <View style={styles.header}>
                <TouchableButton iconName='navigate-before' onPress={setBeforeDate.bind(this)} />
                <View style={styles.dateContainer}>
                    <Text style={styles.yearText}>{currentMonthYear.year}</Text>
                    <Text style={styles.monthText}>{MONTH_NAMES[currentMonthYear.month].toUpperCase()}</Text>
                </View>
                <TouchableButton iconName='navigate-next' onPress={setNextDate.bind(this)} />
            </View>
            <View style={styles.daysOfWeekContainer}>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>ПН</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>ВТ</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>СР</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>ЧТ</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>ПТ</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>СБ</Text>
                </View>
                <View style={styles.dayOfWeekItem}>
                    <Text style={styles.dayOfWeekText}>ВС</Text>
                </View>
            </View>
        </View>
    )
};


const DateCell = ({date, onSelectDate, onEditReport, loading}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback
        : TouchableOpacity;
    const opacity = date.disable ? 0.2 : 1;
    const dateNow = new Date()
    let iconName;
    let iconColor;
    if (date.loading) {
        return (
            <TouchableComponent>
                <View style={styles.dateCell}>
                    <Text style={{opacity: opacity }}>{date.fullDate.getDate()}</Text>
                    <ActivityIndicator size='small' color={Colors.primary} />
                </View>
            </TouchableComponent>
        )
    }
    if (date.report) {
        iconName = 'ios-checkmark-circle';
        iconColor = Colors.primary;
    } else if (eqDates(date.fullDate, dateNow)) {
        iconName = 'ios-help-circle';
        iconColor = Colors.orange;
    } else if (date.fullDate < dateNow) {
        iconName = 'ios-help-circle';
        iconColor = Colors.red;
    }
    const onSelectHandler = () => {
        if (date.report) {
            onEditReport(date.report);
        } else {
            onSelectDate(date.fullDate);
        }
    }
    return (
        <TouchableComponent onPress={onSelectHandler}>
            <View style={styles.dateCell}>
                <Text style={{opacity: opacity }}>{date.fullDate.getDate()}</Text>
                {iconName && iconColor && <Ionicons style={{opacity: opacity }} name={iconName} size={30} color={iconColor}
                />}
            </View>
        </TouchableComponent>
    )
}

const DatesRow = ({datesRow, ...props}) => {
    return (
        <View style={styles.datesRow}>
            {datesRow.map(date => <DateCell key={date.fullDate.toISOString()} date={date} {...props} />)}
        </View>
    )
};

const Calendar = ({monthlyReports, ...props}) => {
    const currentDate = new Date();
    const [dates, setDates] = useState(getMonthDates(currentDate));
    const dispatch = useDispatch();

    const [currentMonthYear, setCurrentMonthYear] = useState({
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
    });

    const loadReportsOnMonthYear = useCallback( async () => {
        await dispatch(reportActions.fetchMonthlyReports(currentMonthYear.month, currentMonthYear.year));
        setDates(prevDates => {
            const newDates = [...prevDates];
            for (let i = 0; i < newDates.length; i++) {
                for (let j = 0; j < newDates[i].length; j++) {
                    const report = monthlyReports.reports.find(report => eqDates(report.date, newDates[i][j].fullDate));
                    if (report) {
                        newDates[i][j] = {
                            ...newDates[i][j],
                            report
                        }
                    }
                    newDates[i][j].loading = false;
                }
            }
            return newDates;
        });
    }, [dates, currentMonthYear, monthlyReports]);

    const setNextDate = () => {
        setCurrentMonthYear(prev => {
            const month = prev.month === 11 ? 0 : prev.month + 1;
            const year = prev.month === 11 ? prev.year + 1 : prev.year;
            setDates(getMonthDates(new Date(year, month)));
            return { month, year };
        });
    };

    const setBeforeDate = () => {
        setCurrentMonthYear(prev => {
            const month = prev.month === 0 ? 11 : prev.month - 1;
            const year = prev.month === 0 ? prev.year - 1 : prev.year;
            setDates(getMonthDates(new Date(year, month)));
            return { month, year };
        })
    };

    useEffect(() => {
        loadReportsOnMonthYear();
    }, [currentMonthYear, monthlyReports]);

    return (
        <Card style={styles.card}>
            <View style={styles.calendar}>
                <CalendarHeader
                    currentMonthYear={currentMonthYear}
                    setBeforeDate={setBeforeDate}
                    setNextDate={setNextDate}
                />
                <View style={styles.datesContainer}>
                    {dates.map(datesRow => <DatesRow
                        key={JSON.stringify(datesRow)}
                        onSelectDate={props.onSelectDate.bind(this)}
                        onEditReport={props.onEditReport.bind(this)}
                        datesRow={datesRow}
                    />)}
                </View>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    calendar: {

    },
    datesContainer: {

    },
    datesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateCell: {
        padding: 5,
        borderColor: Colors.whitesmoke,
        borderLeftWidth: 1,
        width: 50,
        height: 60,
        alignItems: 'flex-end',
        justifyContent: 'flex-start'

    },
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10,
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dayOfWeekItem: {
        padding: 10,
        backgroundColor: Colors.primary,
        flexGrow: 1,

    },
    dayOfWeekText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    touchable: {
        borderRadius: 50,
        overflow: 'hidden'
    },
    navBtn: {
        overflow: 'hidden',
        borderRadius: 50
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    yearText: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    monthText: {
        fontSize: 18
    }
});

export default Calendar;
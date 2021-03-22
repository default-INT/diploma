import React, {useState, useEffect, useReducer} from "react";
import {StyleSheet, Text, View, ActivityIndicator} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from "react-redux";

import { Input } from "../../components";
import { Card, WorkItem } from "../../components";
import { MaterialHeaderButton, TouchableButton } from "../../components/UI";
import { reportActions } from "../../store/actions";
import { formReducer } from "../../store/reducers";
import { FORM_INPUT_UPDATE } from "../../constants/types";
import {toDateFormat} from "../../utils";
import Colors from "../../constants/colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {DayStat} from "../../models";


const EditReportScreen = props => {
    const routeParams = props.route.params;
    const dispatch = useDispatch();

    const [date, setDate] = useState(routeParams.selectedDate ?
        new Date(routeParams.year, routeParams.month, routeParams.date)
        : new Date());

    const reportId = routeParams.reportId;
    const editedReport = useSelector(state => state.reports.selectedReport);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    }

    useEffect(() => {
        //TODO: must be async + add activity indicator!
        if (reportId) {
            dispatch(reportActions.getReport(reportId));
            console.log(reportId);
            console.log(editedReport);
        } else {
            dispatch(reportActions.createEmptyReport(date));
        }
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: reportId ? 'Редактирование отчета' : 'Добавление отчёта',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        })
    }, []);

    const emptyEmployeesListText = <Text>Список сотрудников пуст!</Text>;

    return (
        <View style={styles.screen}>

            <Card style={styles.formContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Дата: {toDateFormat(date)}</Text>
                    <TouchableButton iconName="mode-edit" onPress={() => setShowDatePicker(true)} size={24} style={styles.editBtn} />
                </View>
                {showDatePicker && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={dateOnChange}
                />)}
            </Card>

            <Card style={styles.formContainer}>
                <View style={{...styles.title, ...styles.titleLine}}>
                    <Text style={styles.titleText}>Сотрудники</Text>
                    <TouchableButton iconName="add-circle-outline" size={24} style={styles.editBtn} />

                </View>
                <View style={styles.formBody}>
                    {reportId && editedReport ? editedReport.workItems.length === 0 ? emptyEmployeesListText :
                        editedReport.workItems.map(workItem => <WorkItem key={workItem.id} workItem={workItem} />)
                        : emptyEmployeesListText
                    }
                </View>
            </Card>

            <Card style={styles.formContainer}>
                <View style={{...styles.title, ...styles.titleLine}}>
                    <Text style={styles.titleText}>Итог за день</Text>
                </View>
                <View style={styles.formBody}>
                    {editedReport ? <Text>WorkItems</Text>
                        : <Text>Информация отсутствует!</Text>
                    }
                </View>
            </Card>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    editBtn: {
        opacity: .5,
        padding: 5
    },
    formContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.white,
    },
    formBody: {
        padding: 10,
        alignItems: 'center'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50
    },
    titleLine: {
        borderBottomColor: Colors.whitesmoke,
        borderBottomWidth: 2
    },
    titleText: {
        fontSize: 16
    }
})

export default EditReportScreen
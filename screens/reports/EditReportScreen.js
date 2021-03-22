import React, {useState, useEffect, useReducer} from "react";
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from "react-redux";

import { FormTitle, EmployeeItemCmp, CardForm, FormBody } from "../../components";
import { MaterialHeaderButton, TouchableButton } from "../../components/UI";
import {reportActions} from "../../store/actions";
import {toDateFormat} from "../../utils";
import Colors from "../../constants/colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import DayStatItem from "../../components/palletprod/DayStatItem";


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

    const onAddEmployeeHandler = () => {
        props.navigation.navigate('EditEmployeeReport', {});
    }

    const onEditEmployeeItemHandler = employeeItemId => {
        props.navigation.navigate('EditEmployeeReport', {
            employeeItemId
        })
    };

    const onDeleteEmployeeItemHandler = employeeItemId => {
        Alert.alert('Удаление', 'Вы действительно хотите удалить сотрудника с отчёта?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {

                }
            }
        ]);
    };

    const emptyEmployeesListText = <Text>Список сотрудников пуст!</Text>;

    return (
        <ScrollView>
            <View style={styles.screen}>

                <CardForm>
                    <FormTitle >
                        <Text style={styles.titleText}>Дата: {toDateFormat(date)}</Text>
                        <TouchableButton iconName="mode-edit" onPress={() => setShowDatePicker(true)} size={24} style={styles.editBtn} />
                    </FormTitle>
                    {showDatePicker && (<DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={dateOnChange}
                    />)}
                </CardForm>

                <CardForm>
                    <FormTitle titleLine>
                        <Text style={styles.titleText}>Сотрудники</Text>
                        <TouchableButton iconName="add-circle-outline" onPress={onAddEmployeeHandler} size={24} style={styles.editBtn} />
                    </FormTitle>
                    <FormBody>
                        {reportId && editedReport ? editedReport.employeeItems.length === 0 ? emptyEmployeesListText :
                            editedReport.employeeItems.map(employeeItem =>
                                <EmployeeItemCmp
                                    key={employeeItem.id}
                                    onEdit={onEditEmployeeItemHandler.bind(this)}
                                    onDelete={onDeleteEmployeeItemHandler.bind(this)}
                                    employeeItem={employeeItem}
                                />)
                            : emptyEmployeesListText
                        }
                    </FormBody>
                </CardForm>

                <CardForm>
                    <FormTitle titleLine>
                        <Text style={styles.titleText}>Итог за день</Text>
                    </FormTitle>
                    <FormBody style={styles.daysStatBox}>
                        {editedReport && editedReport.dayStats && editedReport.dayStats.length !== 0 ?
                            <View>
                                {editedReport.dayStats.map(dayStat => <DayStatItem key={dayStat.id} dayStat={dayStat} />)}
                                <View style={styles.totalSalaryBox}>
                                    <Text>Суммарные выплаты рабочим: {editedReport.dayStats.map(dayStat => dayStat.totalSalary)
                                        .reduce((d1, d2) => d1 + d2)} р</Text>
                                </View>
                            </View>
                            : <Text>Информация отсутствует!</Text>
                        }
                    </FormBody>
                </CardForm>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    totalSalaryBox: {
        padding: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.whitesmoke
    },
    editBtn: {
        opacity: .5,
        padding: 5
    },
    daysStatBox: {
        paddingHorizontal: 30
    },
    titleText: {
        fontSize: 16
    }
})

export default EditReportScreen
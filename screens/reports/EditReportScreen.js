import React, {useState, useEffect, useCallback} from "react";
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
import {DayStat} from "../../models";


const EditReportScreen = props => {
    const routeParams = props.route.params;
    const dispatch = useDispatch();

    let dateInit = new Date();
    if (routeParams.selectedDate) {
        const day = routeParams.date < 10 ? '0' + routeParams.date : routeParams.date;
        const month = routeParams.month + 1 < 10 ? '0' + (routeParams.month + 1) : (routeParams.month + 1);
        const dateFormat = `${routeParams.year}-${month}-${day}T00:00`;0
        dateInit = new Date(dateFormat);
    }

    const [date, setDate] = useState(dateInit);

    const reportId = routeParams.reportId;
    const {selectedReport:editedReport, loading, error} = useSelector(state => state.reports);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    }

    const navigation = props.navigation;

    const submitHandler = useCallback(async () => {
        if (!reportId) {
            await dispatch(reportActions.addReport(date, editedReport));
        } else {
            await dispatch(reportActions.updateReport(date, editedReport));
        }
        if (error === null) {
            navigation.goBack();
        }
    }, [date, setDate, editedReport, dispatch, navigation]);

    useEffect(() => {
        //TODO: must be async + add activity indicator!
        if (!reportId) {
            // dispatch(reportActions.getReport(reportId));
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
                    onPress={submitHandler.bind(this)}
                />
            </HeaderButtons>
        })
    }, [submitHandler]);

    const onAddEmployeeHandler = () => {
        dispatch(reportActions.loadSelectedEmployeeItem());
        props.navigation.navigate('EditEmployeeReport', {});
    }

    const onEditEmployeeItemHandler = employeeItemId => {
        dispatch(reportActions.loadSelectedEmployeeItem(employeeItemId));
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
                    dispatch(reportActions.deleteEmployeeItemReport(employeeItemId))
                }
            }
        ]);
    };

    const emptyEmployeesListText = <Text>Список сотрудников пуст!</Text>;

    if (!editedReport || loading) {
        return (
            <View style={styles.centredScreen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }


    const dayStatsMap = new Map();
    if (editedReport.employeeItems.length !== 0) {
        const workItems = editedReport.employeeItems
            .map(employeeItem => employeeItem.workItems)
            .reduce((workItems1, workItems2) => workItems1.concat(workItems2));

        workItems.forEach(workItem => {
            if (!dayStatsMap.has(workItem.position.id)) {
                dayStatsMap.set(workItem.position.id, new DayStat(
                    new Date().toISOString(),
                    workItem.position,
                    workItem.itemNum,
                    workItem.itemNum * workItem.position.itemTariff
                ));
            } else {
                dayStatsMap.get(workItem.position.id).totalNum += workItem.itemNum;
                dayStatsMap.get(workItem.position.id).totalSalary += workItem.itemNum * workItem.position.itemTariff;
            }
        });
    }
    const dayStats = [...dayStatsMap.values()];
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
                        {editedReport ? editedReport.employeeItems.length === 0 ? emptyEmployeesListText :
                            editedReport.employeeItems.filter(employeeItem => employeeItem.employee).map(employeeItem =>
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
                        {editedReport && dayStats && dayStats.length !== 0 ?
                            <View>
                                {dayStats.map(dayStat => <DayStatItem key={dayStat.id + dayStat.position.name} dayStat={dayStat} />)}
                                <View style={styles.totalSalaryBox}>
                                    <Text>Суммарные выплаты рабочим: {dayStats.map(dayStat => dayStat.totalSalary)
                                        .reduce((d1, d2) => d1 + d2).toFixed(2)} р</Text>
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
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
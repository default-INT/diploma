import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Picker} from "@react-native-picker/picker";

import {CardForm, FormBody, FormTitle, WorkItemCmp, EmployeePicker} from "../../components";
import {MaterialHeaderButton, TouchableButton} from "../../components/UI";
import Colors from "../../constants/colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {EmployeeItem} from "../../models";
import {employeeActions, reportActions} from "../../store/actions";


const EditEmployeeReportScreen = ({navigation, route, ...props}) => {

    const employeeItemId = route.params.employeeItemId;
    const {employees, loading} = useSelector(state => state.employees);
    const editedEmployeeItem = useSelector(state => state.reports.selectedEmployeeItem);

    const dispatch = useDispatch();

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(editedEmployeeItem && editedEmployeeItem.employee ?
        editedEmployeeItem.employee.id : 0);
    const workItems = editedEmployeeItem.workItems ? [...editedEmployeeItem.workItems] : [];

    const emptyWorkItemsListText = <Text>Список работ сотрудника за день пуст!</Text>;

    const onAddWorkItemHandler = () => {
        navigation.navigate('EditWorkItemReport', {employeeItemId: editedEmployeeItem.id})
    }

    const onEditWorkItemHandler = (workItemId) => {
        navigation.navigate('EditWorkItemReport', {workItemId, employeeItemId: editedEmployeeItem.id})
    }

    const onDeleteWorkItemHandler = workItemId => {
        Alert.alert('Удаление', 'Вы действительно хотите удалить деятельность сотрудника?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    dispatch(reportActions.deleteWorkItemReport(workItemId));
                }
            }
        ]);
    }

    const loadEmployees = useCallback(() => {
        dispatch(employeeActions.fetchEmployees());
    }, [dispatch]);

    const onSaveHandler = useCallback(() => {
        const workItems = [...editedEmployeeItem.workItems];
        if (workItems.length === 0) {
            Alert.alert('Ошибка', 'Список деятельности сотрудника за день не может быть пустым!', [
                { text: 'Ок'}
            ]);
            return;
        }
        const employee = employees.find(({id}) => id === selectedEmployeeId);
        if (!employeeItemId) {
            dispatch(reportActions.addEmployeeItemReport(new EmployeeItem(
                editedEmployeeItem.id,
                employee,
                workItems,
                workItems.map(({salary}) => salary)
                    .reduce((d1, d2) => d1 + d2)
            )))
        } else {
            dispatch(reportActions.updateEmployeeItemReport(new EmployeeItem(
                editedEmployeeItem.id,
                employee,
                workItems,
                workItems.map(({salary}) => salary)
                    .reduce((d1, d2) => d1 + d2)
            )))
        }
        navigation.goBack();
    }, [dispatch, workItems, editedEmployeeItem, selectedEmployeeId]);

    useEffect(() => {
        if (employees && employees.length !== 0) {
            setSelectedEmployeeId(editedEmployeeItem && editedEmployeeItem.employee ?
                editedEmployeeItem.employee.id
                : employees[0].id);
        }
    }, [employees]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (employeeItemId ? 'Редактирование' : 'Добавление') + ' сотрудника',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={() => onSaveHandler()}
                />
            </HeaderButtons>
        })
    }, [navigation, onSaveHandler]);

    useEffect(() => {
        if (employees.length === 0) {
            loadEmployees();
        }
        dispatch(reportActions.loadSelectedEmployeeItem(employeeItemId));
    }, []);

    if (!editedEmployeeItem || loading || employees.length === 0) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View>
                <CardForm>
                    {/*<EmployeePicker*/}
                    {/*    employees={employees}*/}
                    {/*    selectedEmployeeId={selectedEmployeeId}*/}
                    {/*    setSelectedEmployeeId={setSelectedEmployeeId}*/}
                    {/*/>*/}
                    <Picker
                        selectedValue={selectedEmployeeId}
                        onValueChange={((itemValue, itemIndex) => {
                            setSelectedEmployeeId(itemValue);
                        } )}
                    >
                        {employees.map(({fullName, id}) =>  <Picker.Item key={id} label={fullName} value={id} />)}
                    </Picker>
                </CardForm>

                <CardForm>
                    <FormTitle titleLine>
                        <Text>Работа за день</Text>
                        <TouchableButton iconName="add-circle-outline" size={24} style={styles.editBtn}
                                         onPress={onAddWorkItemHandler.bind(this)} />
                    </FormTitle>
                    <FormBody>
                        {workItems.length === 0 ? emptyWorkItemsListText
                            : workItems.map(workItem => (
                                <WorkItemCmp key={workItem.id}
                                             workItem={workItem}
                                             onEdit={onEditWorkItemHandler.bind(this)}
                                             onDelete={onDeleteWorkItemHandler.bind(this)}
                                />
                            ))}
                    </FormBody>
                </CardForm>

                <CardForm>
                    <FormTitle titleLine>
                        <Text style={styles.titleText}>Итог за день</Text>
                    </FormTitle>
                    <FormBody style={styles.daysStatBox}>
                        {workItems.length !== 0 ?
                            <View>
                                <View style={styles.totalSalaryBox}>
                                    <Text>Суммарные выплаты сотруднику: {workItems.map(({salary}) => salary)
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
    editBtn: {
        opacity: .5,
        padding: 5
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditEmployeeReportScreen
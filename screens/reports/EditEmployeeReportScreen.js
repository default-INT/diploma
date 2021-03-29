import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Picker} from "@react-native-picker/picker";

import {FormTitle, CardForm, FormBody, WorkItemCmp} from "../../components";
import { MaterialHeaderButton, TouchableButton } from "../../components/UI";
import Colors from "../../constants/colors";
import DayStatItem from "../../components/palletprod/DayStatItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const EditEmployeeReportScreen = props => {

    const {navigation, route} = props;

    const employeeItemId = route.params.employeeItemId;
    const editedEmployeeItem = useSelector(state => state.reports.selectedReport.employeeItems
        .find(employeeItem => employeeItem.id === employeeItemId));

    const [selectedEmployee, setSelectedEmployee] = useState(editedEmployeeItem ? editedEmployeeItem.employee.id : 0);
    const [workItems, setWorkItems] = useState(editedEmployeeItem ? editedEmployeeItem.workItems : []);

    const employees = useSelector(state => state.employees.employees);

    const dispatch = useDispatch();

    const emptyWorkItemsListText = <Text>Список работ сотрудника за день пуст!</Text>;

    const onAddWorkItemHandler = () => {
        navigation.navigate('EditWorkItemReport', {})
    }

    const onEditWorkItemHandler = workItemId => {
        navigation.navigate('EditWorkItemReport', {workItemId})
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (editedEmployeeItem ? 'Редактирование' : 'Добавление') + ' сотрудника',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        })
    }, [navigation]);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <CardForm>
                    <Picker
                        selectedValue={selectedEmployee}
                        onValueChange={((itemValue, itemIndex) => {
                            setSelectedEmployee(itemValue);
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
})

export default EditEmployeeReportScreen
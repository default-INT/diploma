import React, {useEffect} from "react"
import {StyleSheet, Text, View} from "react-native"
import {useSelector, useDispatch} from "react-redux"

const EditEmployeeReportScreen = props => {
    const {navigation, route} = props;
    const dispatch = useDispatch();
    const employeeItemId = route.params.employeeItemId;
    const editedEmployeeItem = useSelector(state => state.reports.selectedReport.employeeItems
        .find(employeeItem => employeeItem.id === employeeItemId));

    useEffect(() => {
        navigation.setOptions({
            headerTitle: editedEmployeeItem ? 'Редактирование' : 'Добавление'
        })
    }, [navigation]);
    return (
        <View>
            <Text>Add employee report screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EditEmployeeReportScreen
import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native"
import {useSelector} from "react-redux"

import {HeaderToggleButton} from "../default-options";
import {EmployeeItem} from "../../components"

const EmployeesScreen = props => {
    const employees = useSelector(state => state.employees.employees)
    return (
        <FlatList
            data={employees}
            renderItem={itemData => (<EmployeeItem employee={itemData.item}/>)}
        />
    )
}

export const employeesOptions = navData => {
    return {
        headerTitle: 'Сотрудники',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    }
})

export default EmployeesScreen
import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native"
import {useSelector} from "react-redux"

import {HeaderToggleButton} from "../default-options";
import {EmployeeItem} from "../../components"
import {MaterialHeaderButton} from "../../components/UI";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const EmployeesScreen = props => {
    const employees = useSelector(state => state.employees.employees)
    const {navigation} = props
    const selectItemHandler = (id, fullName) => {
        navigation.navigate('EmployeeDetails', {
            employeeId: id,
            employeeFullName: fullName
        });
    };
    return (
        <FlatList
            data={employees}
            renderItem={itemData => (
                <EmployeeItem
                    employee={itemData.item}
                    onSelect={selectItemHandler.bind(this, itemData.item.id, itemData.item.fullName)}
                />
            )}
        />
    )
}

export const employeesOptions = navData => {
    return {
        headerTitle: 'Сотрудники',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add employee"
                    iconName="add-circle-outline"
                    onPress={() => {
                        navData.navigation.navigate('EditEmployee', {})
                    }}
                />
            </HeaderButtons>
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
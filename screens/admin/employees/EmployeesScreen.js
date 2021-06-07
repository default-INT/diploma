import React, {useCallback, useEffect} from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native"
import {useSelector, useDispatch} from "react-redux"

import {HeaderToggleButton} from "../../default-options";
import {EmployeeItem} from "../../../components"
import {MaterialHeaderButton} from "../../../components/UI";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {employeeActions} from "../../../store/actions";
import Colors from "../../../constants/colors";

const EmployeesScreen = props => {
    const {employees, loading, error} = useSelector(state => state.employees)
    const dispatch = useDispatch();
    const {navigation} = props

    const loadEmployees = useCallback(() => {
        dispatch(employeeActions.fetchEmployees());
    }, [dispatch]);

    const selectItemHandler = (id, fullName) => {
        navigation.navigate('EmployeeDetails', {
            employeeId: id,
            employeeFullName: fullName
        });
    };

    useEffect(() => {
        return navigation.dangerouslyGetParent().addListener('focus', () => {
            loadEmployees();
        });
    }, [navigation]);


    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова' color={Colors.primary} onPress={() => loadEmployees()}/>
                </View>
            </View>
        )
    }

    if (employees.length === 0) {
        return (
            <View style={styles.screen}>
                <Text>Не было найденно ни одного сотрудника</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={employees}
            renderItem={itemData => (
                <EmployeeItem
                    employee={itemData.item}
                    onSelect={selectItemHandler.bind(this, itemData.item.id, itemData.item.fullName)}
                />
            )}
            refreshing={loading}
            onRefresh={() => loadEmployees()}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        marginTop: 20
    },
})

export default EmployeesScreen
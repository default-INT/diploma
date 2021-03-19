import React, {useEffect} from "react";
import {View, Text, StyleSheet, Button} from "react-native"
import {useSelector} from "react-redux"

import {Card} from "../../components"
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {MaterialHeaderButton} from "../../components/UI";
import Colors from "../../constants/colors"

const Field = ({title, value}) => {
    return (
        <View style={styles.field}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    )
}

const EmployeeDetailsScreen = props => {
    const employeeId = props.route.params.employeeId
    const employee = useSelector(state => state.employees.employees.find(employee => employee.id === employeeId))

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: employee.fullName
        })
    }, [employee])

    return (
        <Card style={styles.screen}>
            <View>
                <View style={styles.employeeInfo}>
                    <Field title={'Фамилия:'} value={employee.lastName}/>
                    <Field title={'Имя:'} value={employee.firstName}/>
                    <Field title={'Отчество:'} value={employee.secondName}/>
                    <Field title={'Год рождения:'} value={employee.birthdayYear + ' г.'}/>
                    <Field title={'Номер телефона:'} value={employee.phoneNumber}/>
                </View>
                <View style={styles.btnContainer}>
                    <Button color={Colors.red} title="Уволить" />
                </View>
            </View>
        </Card>
    )
}

export const employeeDetailsOptions = navData => {
    const employeeFullName = navData.route.params.employeeFullName;
    const employeeId = navData.route.params.employeeId;
    return {
        headerTitle: employeeFullName,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Edit employee"
                    iconName="edit"
                    onPress={() => {
                        navData.navigation.navigate('EditEmployee', {
                            employeeId
                        });
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        alignItems: 'center'
    },
    employeeInfo: {
        justifyContent: 'center',
        width: 300,
        borderBottomColor: Colors.whitesmoke,
        borderBottomWidth: 2,
        paddingBottom: 20,
        marginBottom: 20
    },
    field: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        paddingHorizontal: 40
    }
})

export default EmployeeDetailsScreen
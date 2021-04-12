import React, {useEffect} from "react";
import {View, Text, StyleSheet, Button, Alert, ActivityIndicator} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {Card} from "../../components"
import {MaterialHeaderButton} from "../../components/UI";
import {employeeActions} from "../../store/actions"
import Colors from "../../constants/colors"

const Field = ({title, value}) => {
    return (
        <View style={styles.field}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    )
}

const EmployeeDetailsScreen = ({navigation, ...props}) => {
    const employeeId = props.route.params.employeeId
    const employee = useSelector(state => state.employees.employees.find(employee => employee.id === employeeId));
    const {loading, error} = useSelector(state => state.employees);

    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: employee ? employee.fullName : 'Увольнение...'
        });
    }, [navigation]);

    useEffect(() => {
        if (error) {
            Alert.alert('Произошла ошибка!', error, [{ text: 'Ок' }]);
        }
    }, [error]);


    const deleteHandler = () => {
        Alert.alert('Увольнение', 'Вы действительно хотите уволить сотрудника?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    dispatch(employeeActions.fireEmployee(employeeId));
                    navigation.goBack();
                }
            }
        ]);
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!employee) {
        return (
            <View style={styles.centered}>
                <Text>Не удалось найти сотрудника!</Text>
            </View>
        );
    }

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
                    <Button color={Colors.red} title="Уволить" onPress={deleteHandler.bind(this)} />
                </View>
            </View>
        </Card>
    )
}

export const employeeDetailsOptions = navData => {
    const employeeId = navData.route.params.employeeId;
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Edit"
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
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EmployeeDetailsScreen
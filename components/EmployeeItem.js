import React from "react";
import {Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";

import Card from "./Card"
import Colors from "../constants/colors"


const EmployeeItem = ({employee, ...props}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <Card style={styles.card} >
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View style={styles.employeeContainer}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{employee.fullName}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text>Год рождения: {employee.birthdayYear} г.</Text>
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10
    },
    employeeContainer: {
        padding: 20
    },
    title: {
        borderBottomColor: Colors.whitesmoke,
        borderBottomWidth: 2,
        padding: 10,
    },
    info: {
        padding: 10
    },
    titleText: {
        fontSize: 16
    }
})

export default EmployeeItem
import React, {useState} from "react";
import {View, StyleSheet, Text, Platform, TouchableNativeFeedback, TouchableOpacity} from "react-native";

import Colors from "../../constants/colors";
import {TouchableButton} from "../UI";

/**
 *
 * @param {EmployeeItem} employeeItem
 * @param {object} props
 * @constructor
 */
const EmployeeItemCmp = ({employeeItem, ...props}) => {
    const [isOpen, setIsOpen] = useState(false)
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback
        : TouchableOpacity;
    return (
        <View style={styles.itemContainer}>
            <TouchableComponent useForeground onPress={() => setIsOpen(prevState => !prevState)}>
                <View style={styles.touchable}>
                    <View style={{...styles.title, borderBottomWidth: isOpen ? 1 : 0}}>
                        <Text style={styles.titleText}>{employeeItem.employee.fullName}</Text>
                        <View style={styles.controlButtons}>
                            <TouchableButton iconName="mode-edit" size={20} style={styles.touchBtn} onPress={() => props.onEdit(employeeItem.id)} />
                            <TouchableButton iconName="delete" size={20} style={styles.touchBtn} onPress={() => props.onDelete(employeeItem.id)} />
                        </View>
                    </View>
                    {isOpen && <View>
                        <View style={styles.workItemContainer}>
                            {employeeItem.workItems.map(itemData => (
                                <View key={itemData.id} style={styles.field}>
                                    <Text>{itemData.position.name}</Text>
                                    <Text>{itemData.itemNum} {itemData.position.itemName.split('/')[1]}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.totalSalary}>
                            <Text>Заработок: {employeeItem.totalSalary} р</Text>
                        </View>
                    </View>
                    }

                </View>
            </TouchableComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    controlButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    workItemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.whitesmoke
    },
    totalSalary: {
        padding: 10
    },
    touchable: {
        padding: 10,
        overflow: 'hidden'
    },
    itemContainer: {
        borderWidth: 2,
        borderColor: Colors.whitesmoke,
        width: '100%',
        borderRadius: 10,
        marginBottom: 8,
        overflow: 'hidden'
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    titleText: {
        fontWeight: 'bold'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        padding: 5,
        borderBottomColor: Colors.whitesmoke
    },
    touchBtn: {
        opacity: .5,
        padding: 5
    }
});

export default EmployeeItemCmp;
import React from "react";
import {StyleSheet, Text, View} from "react-native";

import Colors from "../../constants/colors";
import {TouchableButton} from "../UI";

/**
 *
 * @param {WorkItem} workItem
 * @param {object} props
 * @constructor
 */
const WorkItemCmp = ({workItem, ...props}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.touchable}>
                <View style={{...styles.title, borderBottomWidth: 1 }}>
                    <Text style={styles.titleText}>{workItem.position.name}</Text>
                    <View style={styles.controlButtons}>
                        <TouchableButton iconName="mode-edit" size={20} style={styles.touchBtn} onPress={() => props.onEdit(workItem.id)} />
                        <TouchableButton iconName="delete" size={20} style={styles.touchBtn} onPress={() => props.onDelete(workItem.id)} />
                    </View>
                </View>
                <View>
                    <View style={styles.workItemContainer}>
                        <View style={styles.field}>
                            <Text>Тариф</Text>
                            <Text>{workItem.position.itemTariff} {workItem.position.itemName}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text>Количество</Text>
                            <Text>{workItem.itemNum} {workItem.position.itemName.split('/')[1]}</Text>
                        </View>
                    </View>
                    <View style={styles.totalSalary}>
                        <Text>Суммарный заработок: {workItem.salary} р</Text>
                    </View>
                </View>

            </View>
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

export default WorkItemCmp;
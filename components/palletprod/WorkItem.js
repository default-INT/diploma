import React from "react";
import {View, StyleSheet, Text} from "react-native";

import Colors from "../../constants/colors";
import {TouchableButton} from "../UI";

/**
 *
 * @param {WorkItem} workItem
 * @param {object} props
 * @constructor
 */
const WorkItem = ({workItem, ...props}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.title}>
                <Text>{workItem.employee.fullName}</Text>
                <TouchableButton iconName="mode-edit" size={20} style={styles.touchBtn} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 2,
        borderColor: Colors.whitesmoke,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    touchBtn: {
        opacity: .5,
        padding: 5
    }
});

export default WorkItem;
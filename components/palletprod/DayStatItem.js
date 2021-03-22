import React from "react";
import {View, StyleSheet, Text} from "react-native";


/**
 *
 * @param {DayStat} datStat
 * @param {object} props
 * @returns {JSX.Element}
 * @constructor
 */
const DayStatItem = ({dayStat, ...props}) => {
    return (
        <View style={styles.dayStat}>
            <Text>{dayStat.position.name}</Text>
            <View style={styles.values}>
                <Text>{dayStat.totalNum} {dayStat.position.itemName.split('/')[1]}</Text>
                <Text>{dayStat.totalSalary} р.</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    dayStat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    values: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100
    }
});

export default DayStatItem;
import React from "react";
import {View, Text, StyleSheet} from "react-native";

import Card from "../Card";
import Colors from "../../constants/colors";

const StatisticEmployeeItem = ({statistic, ...props}) => {
    const {statisticItems} = statistic;
    return (
        <Card style={styles.card}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{statistic.employee}</Text>
            </View>
            <View style={styles.employeeStatisticBox}>
                {statisticItems.length === 0 ? (
                    <View>
                        <Text>Нет информации о рабочей деятельности сотрудника за данный период.</Text>
                    </View>
                ) : statisticItems.map(statisticItem => (
                    <View key={statisticItem.position} style={styles.field}>
                        <Text>{statisticItem.position}</Text>
                        <View style={styles.valueCell}>
                            <Text style={styles.valueText} >{statisticItem.itemCount} {statisticItem.itemName.split('/')[1]}</Text>
                            <Text style={styles.valueText}>{statisticItem.income} {statisticItem.itemName.split('/')[0]}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.totalSalary}>
                <Text>Заработок: <Text style={styles.salaryText}>{statistic.totalSalary} р</Text> </Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10,
        padding: 10
    },
    totalSalary: {
        padding: 10
    },
    employeeStatisticBox: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.whitesmoke,
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    title: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.whitesmoke,
        padding: 10
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    salaryText: {
        fontWeight: 'bold'
    },
    valueCell: {
        flexDirection: 'row',
    },
    valueText: {
        paddingHorizontal: 10
    }
});

export default StatisticEmployeeItem;
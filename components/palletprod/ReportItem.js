import React from "react";
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform} from "react-native";

import Card from "../Card";
import Colors from "../../constants/colors";

const nameDayOfWeek = {
    0: 'вс',
    1: 'пн',
    2: 'вт',
    3: 'ср',
    4: 'чт',
    5: 'пт',
    6: 'сб'
}

const toDateFormat = date => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

const ReportItem = ({report, ...props}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <Card style={styles.card} >
            <View style={styles.touchable}>
                <TouchableComponent onPress={() => ''} useForeground>
                    <View style={styles.reportContainer}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{toDateFormat(report.date)}</Text>
                            <Text style={{
                                ...styles.titleText,
                                color: report.date.getDay() === 6 || report.date.getDay() === 0 ? Colors.red : Colors.black}}>
                                    {nameDayOfWeek[report.date.getDay()].toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            {report.dayStats.filter(dayStat => dayStat.position.isPallet)
                                .map(dayStat => <View key={dayStat.id} style={styles.field}>
                                    <Text>{dayStat.position.name}</Text>
                                    <Text>{dayStat.totalNum} шт</Text>
                                </View>)}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    info: {
        padding: 10
    },
    title: {
        padding: 8,
        borderBottomWidth: 2,
        borderBottomColor: Colors.whitesmoke,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    reportContainer: {
        padding: 10
    },
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
});

export default ReportItem;
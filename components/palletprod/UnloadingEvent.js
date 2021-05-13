import React, {useState} from "react";
import {View, StyleSheet, Text, Platform, TouchableNativeFeedback, TouchableOpacity} from "react-native";

import Colors from "../../constants/colors";
import Card from "../Card";
import {nameDayOfWeek, toDateFormat} from "../../utils";
import {toDateTimeFormat} from "../../utils/date-utils";
import {TouchWrapper} from "../UI";

const UnloadingEvent = ({unloadingItem, onDeleteEvent, ...props}) => {
    const date = new Date(unloadingItem.dateTimeEdit);
    return (
        <Card style={styles.card}>
            <TouchWrapper onLongPress={() => onDeleteEvent(unloadingItem.id)}>
                <View style={styles.wrap}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{toDateTimeFormat(date)}</Text>
                        <Text style={{
                            ...styles.titleText,
                            color: date.getDay() === 6 || date.getDay() === 0 ? Colors.red : Colors.black}}>
                            {nameDayOfWeek[date.getDay()].toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        {unloadingItem.storageItems.map(storageItem => (
                            <View key={storageItem.id} style={styles.field}>
                                <Text>{storageItem.positionName}</Text>
                                <Text>{storageItem.count} шт</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchWrapper>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    wrap: {
        padding: 20
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
    info: {
        padding: 10
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
});

export default UnloadingEvent;
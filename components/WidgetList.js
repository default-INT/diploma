import React from "react";
import { View, Text, StyleSheet } from "react-native"

import Colors from "../constants/colors"

const WidgetList = ({title, children, ...props}) => {
    return (
        <View style={{...styles.mainContainer, ...props.style}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.widgetContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 6,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    widgetContainer: {

    }
})

export default WidgetList
import React from "react"
import {Image, StyleSheet, Text, View} from "react-native"

import Colors from "../constants/colors";
import IconsUri from "../constants/icons"

/***
 *
 * @param dataItem {DataItem}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const Widget = ({dataItem, ...props}) => {
    const imgUri = dataItem.iconUri ? dataItem.iconUri : IconsUri.question
    return (
        <View style={{...styles.widget, ...{borderColor: dataItem.color}}}>
            <View style={styles.iconContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: imgUri
                    }} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={{...styles.title, ...{color: dataItem.color}}}>
                    {dataItem.name.toUpperCase()}
                </Text>
                <Text style={styles.value}>{dataItem.value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    widget: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        borderLeftWidth: 5,
        padding: 10,
        borderColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50
    },
    title: {
        color: Colors.primary,
        fontSize: 18
    },
    value: {
        fontSize: 18
    },
    iconContainer: {
        padding: 5,
        opacity: 0.5
    },
    infoContainer: {
        padding: 5,
        flex: 1,
        justifyContent: 'space-between'
    }
})

export default Widget

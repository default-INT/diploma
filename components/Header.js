import React from "react";
import {StyleSheet, Text, View} from "react-native"

import Colors from "../constants/colors"

const Header = props => {
    return (
        <View style={styles.header} >
            <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        color: Colors.white,
        backgroundColor: Colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    }
});

export default Header
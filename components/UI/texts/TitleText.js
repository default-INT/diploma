import React from "react";
import {Text, StyleSheet} from "react-native";

const TitleText = ({style, children, ...props}) => {
    return (
        <Text style={{...styles.text, ...style}} {...props}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    }
});

export default TitleText
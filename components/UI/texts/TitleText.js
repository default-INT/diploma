import React from "react";
import {Text, StyleSheet} from "react-native";

const TitleText = ({style, fontSize, children, ...props}) => {
    return (
        <Text style={{...styles.text, fontSize, ...style}} {...props}>
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
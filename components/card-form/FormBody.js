import React from "react";
import {StyleSheet, View} from "react-native";

const FormBody = ({children, style, ...props}) => {
    return (
        <View style={{...styles.formBody, ...style}} {...props}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    formBody: {
        padding: 10,
    },
});


export default FormBody;
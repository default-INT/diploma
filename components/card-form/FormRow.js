import React from "react";
import {StyleSheet, View} from "react-native";

const FormRow = ({children, style, ...props}) => {
    return (
        <View style={{...styles.formRow, ...style}} {...props}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    formRow: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});


export default FormRow;
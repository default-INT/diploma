import React from "react";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

const FormTitle = ({children, titleLine, ...props}) => {
    let modStyles = {...props.style};
    if (titleLine) {
        modStyles = {...styles.titleLine, ...modStyles};
    }
    return (
        <View style={{...styles.title, ...modStyles}} {...props}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50
    },
    titleLine: {
        borderBottomColor: Colors.whitesmoke,
        borderBottomWidth: 2
    }
});


export default FormTitle;
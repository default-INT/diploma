import React from "react";
import {StyleSheet, View, Text} from "react-native";

import Card from "../Card";
import Colors from "../../constants/colors";

const CardForm = ({children, ...props}) => {
    return (
        <Card style={styles.formContainer} {...props}>
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.white,
    }
});


export default CardForm;
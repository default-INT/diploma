import React from "react";
import {StyleSheet} from "react-native";

import Card from "../../Card";
import Colors from "../../../constants/colors";

const DefaultCard = ({children, style, ...props}) => {
    return (
        <Card {...props} style={{...styles.card, ...style}}>
            {children}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10
    }
})

export default DefaultCard;
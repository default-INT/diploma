import React from "react";
import {ActivityIndicator, View} from "react-native";

import {DefaultStyles} from "../../styles";
import Colors from "../../constants/colors";

const LargeLoader = ({style, ...props}) => {
    return (
        <View style={{...DefaultStyles.centredScreen, ...style}}>
            <ActivityIndicator size='large' color={Colors.primary} {...props} />
        </View>
    )
};

export default LargeLoader;
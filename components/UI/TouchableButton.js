import React from "react";
import {Platform, TouchableNativeFeedback, TouchableOpacity, View, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

/**
 * Компонент привязываюшие определённую функциональность при нажатии на элемент в UI интерфейсе.
 *
 * @param onPress {function}
 * @param iconName {function}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const TouchableButton = ({onPress = () => '', iconName, ...props}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback
        : TouchableOpacity;
    return (
        <View style={styles.touchable}>
            <TouchableComponent onPress={onPress}>
                <View style={styles.btn} >
                    <MaterialIcons name={iconName} size={34} color="black" {...props} style={styles.icon} />
                </View>
            </TouchableComponent>
        </View>
    )
};

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 50,
        overflow: 'hidden'
    },
    btn: {
        overflow: 'hidden',
        borderRadius: 50
    },
    icon: {
        opacity: .5,
        padding: 5
    }
})

export default TouchableButton;
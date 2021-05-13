import React from "react";
import {Platform, TouchableNativeFeedback, TouchableOpacity, View, StyleSheet} from "react-native";

const TouchWrapper = ({children, onPress = () => '', onLongPress = () => '', borderRadius = 10, ...props}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={{...styles.touchable, borderRadius: borderRadius}} {...props}>
            <TouchableComponent onPress={onPress} useForeground onLongPress={onLongPress}>
                <View>
                    {children}
                </View>
            </TouchableComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    touchable: {
        overflow: 'hidden'
    }
})

export default TouchWrapper;
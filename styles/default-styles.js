import {StyleSheet} from "react-native";

import Colors from "../constants/colors";

export default StyleSheet.create({
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultWhiteScreen: {
        flex: 1,
        backgroundColor: Colors.white
    }
});
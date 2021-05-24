import Colors from "../constants/colors";
import {StyleSheet} from "react-native";

export const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 5,
    },
    headerTitleStyle: {
        color: Colors.white,
    },
    headerBackTitleStyle: {

    },
    headerTintColor: Colors.white,
    headerTitle: ''
};

export const styles = StyleSheet.create({
    drawer: { flex: 1, paddingTop: 30 },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 80,
        height: 80
    },
    profileInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    profileField: {
        padding: 5
    }
})
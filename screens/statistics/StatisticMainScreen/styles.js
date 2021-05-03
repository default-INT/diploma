import {StyleSheet} from "react-native";
import Colors from "../../../constants/colors";

const styles = StyleSheet.create({
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centredCard: {
        padding: 10,
        margin: 10,
        height: 100,
        justifyContent: 'center'
    },
    screen: {
        flex: 1
    },
    totalSalaryBox: {
        padding: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.whitesmoke
    },
    editBtn: {
        opacity: .5,
        padding: 5
    },
    daysStatBox: {
        paddingHorizontal: 30
    },
    titleText: {
        fontSize: 16
    },
    totalSalaryText: {
        fontWeight: 'bold'
    }
});

export default styles;
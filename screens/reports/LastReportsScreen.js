import React from "react"
import { View, Text, StyleSheet } from "react-native"

import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {MaterialHeaderButton} from "../../components/UI";

const LastReportsScreen = props => {
    return <View>
        <Text>Last reports screen!</Text>
    </View>
}

LastReportsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Последние отчёты',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({

})

export default LastReportsScreen
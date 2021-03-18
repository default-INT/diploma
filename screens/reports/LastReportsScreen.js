import React from "react"
import {StyleSheet, Text, View} from "react-native"

import {HeaderToggleButton} from "../default-options"

const LastReportsScreen = props => {
    return <View>
        <Text>Last reports screen!</Text>
    </View>
}

export const lastReportsOptions = navData => {
    return {
        headerTitle: 'Последние отчёты',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        )
    }
}


const styles = StyleSheet.create({

})

export default LastReportsScreen
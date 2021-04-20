import React, {useEffect, useCallback} from "react";
import {View, ActivityIndicator, StyleSheet, FlatList, Alert, Button, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {HeaderToggleButton} from "../default-options";
import {MaterialHeaderButton} from "../../components/UI";

const StatisticMainScreen = props => {
    return (
        <View>
            <Text>Statistic main screen!</Text>
        </View>
    )
}

export const statisticMainScreenOptions = navData => {
    return {
        headerTitle: 'Итоги',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});

export default StatisticMainScreen;
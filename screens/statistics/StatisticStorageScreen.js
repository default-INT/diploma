import React, {useEffect, useCallback} from "react";
import {View, ActivityIndicator, StyleSheet, FlatList, Alert, Button, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {HeaderToggleButton} from "../default-options";
import {MaterialHeaderButton} from "../../components/UI";

const StatisticStorageScreen = props => {
    return (
        <View>
            <Text>Statistic storage screen!</Text>
        </View>
    )
}

export const statisticStorageScreenOptions = navData => {
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

export default StatisticStorageScreen;
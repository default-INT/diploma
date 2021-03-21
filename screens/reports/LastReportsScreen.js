import React from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import {HeaderToggleButton} from "../default-options";
import {MaterialHeaderButton} from "../../components/UI";
import {ReportItem} from "../../components";

const LastReportsScreen = props => {
    const reports = useSelector(state => state.reports.lastReports);
    return (
        <FlatList
            data={reports}
            renderItem={itemData => <ReportItem report={itemData.item} />}
        />
    )
};

export const lastReportsOptions = navData => {
    return {
        headerTitle: 'Последние отчёты',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add"
                    iconName="add-circle-outline"
                    onPress={() => {
                        navData.navigation.navigate('EditReport', {})
                    }}
                />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({

})

export default LastReportsScreen
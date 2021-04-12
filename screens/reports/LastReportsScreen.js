import React, {useEffect, useCallback} from "react";
import {StyleSheet, Text, View, ActivityIndicator, FlatList} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import {HeaderToggleButton} from "../default-options";
import {MaterialHeaderButton} from "../../components/UI";
import {ReportItem} from "../../components";
import {reportActions} from "../../store/actions";
import Colors from "../../constants/colors";

const LastReportsScreen = ({navigation, ...props}) => {
    const {lastReports, loading, error } = useSelector(state => state.reports);
    const dispatch = useDispatch();

    const loadReports = useCallback(() => {
        dispatch(reportActions.fetchLastReports(1));
    }, [dispatch]);

    const onSelectReport = report => {
        dispatch(reportActions.selectReport(report));
        navigation.navigate('EditReport', {
            reportId: report.id,
            selectedDate: true,
            month: report.date.getMonth(),
            year: report.date.getFullYear(),
            date: report.date.getDate()
        })
    };


    useEffect(() => {
        return navigation.dangerouslyGetParent().addListener('focus', () => {
            loadReports();
        });
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={lastReports}
            renderItem={itemData => <ReportItem report={itemData.item} onPress={onSelectReport} />}
            refreshing={loading}
            onRefresh={() => loadReports()}
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LastReportsScreen
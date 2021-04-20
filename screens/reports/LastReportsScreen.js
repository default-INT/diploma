import React, {useCallback, useEffect} from "react";
import {ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from "react-redux";

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
        });
    };

    const onDeleteHandler = reportId => {
        Alert.alert('Удаление', 'Вы действительно хотите удалить отчёт?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    dispatch(reportActions.deleteReport(reportId));
                }
            }
        ]);
    }

    useEffect(() => {
        loadReports();
    }, []);

    useEffect(() => {
        dispatch(reportActions.fetchMonthlyReports(new Date().getMonth(), new Date().getFullYear()));
        return navigation.addListener('focus', () => {
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

    if (error) {
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова' color={Colors.primary} onPress={() => loadReports()}/>
                </View>
            </View>
        )
    }

    if (lastReports.length === 0) {
        return (
            <View style={styles.screen}>
                <Text>Не было найденно ни одного отчёта</Text>
                <View style={styles.btnStyle}>
                    <Button title='Обновить' color={Colors.primary} onPress={() => loadReports()}/>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={lastReports}
            renderItem={itemData => <ReportItem
                report={itemData.item}
                onPress={onSelectReport}
                onLongPress={onDeleteHandler}
            />}
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
    btnStyle: {
        marginTop: 20
    },
});

export default LastReportsScreen;
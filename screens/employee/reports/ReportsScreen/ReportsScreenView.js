import React from "react";
import {Text, FlatList, View, Button, StyleSheet} from "react-native";

import {OverviewCenteredContainer, ScreenContainer, UserReportItem} from "../../../../components";
import {LargeLoader} from "../../../../components/UI";
import Colors from "../../../../constants/colors";

const ReportsScreenView = props => {
    const {userReports, loading, error, loadData} = props;

    if (loading) {
        return (
            <OverviewCenteredContainer>
                <LargeLoader />
            </OverviewCenteredContainer>
        )
    }

    if (error) {
        return (
            <OverviewCenteredContainer>
                <Text>{error}</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова'
                            color={Colors.primary}
                            onPress={() => loadData()}/>
                </View>
            </OverviewCenteredContainer>
        )
    }

    if (userReports.length === 0) {
        return (
            <OverviewCenteredContainer>
                <Text>Отчётов за последний месяц не было найдено</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова'
                            color={Colors.primary}
                            onPress={() => loadData()}/>
                </View>
            </OverviewCenteredContainer>
        )
    }

    return (
        <FlatList
            data={userReports}
            keyExtractor={item => item.employeeItemId}
            renderItem={({item}) => <UserReportItem  report={item} />}
            refreshing={loading}
            onRefresh={() => loadData()}
        />
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        marginTop: 20
    },
});

export default ReportsScreenView;
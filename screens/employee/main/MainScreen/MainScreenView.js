import React from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";

import {OverviewCenteredContainer, ScreenContainer, Widget, WidgetList} from "../../../../components";
import Colors from "../../../../constants/colors";
import IconsUri from "../../../../constants/icons";
import {DataItem} from "../../../../models";
import {LargeLoader} from "../../../../components/UI";

const MainScreenView = props => {
    const {avgMonthSalary, totalMonthSalary, loading, error, loadData} = props;


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

    if (loading) {
        return <OverviewCenteredContainer>
            <LargeLoader/>
        </OverviewCenteredContainer>
    }

    return (
        <ScrollView>
            <ScreenContainer>
                <WidgetList title='Информация о заработной плате'>
                    <Widget dataItem={DataItem.of({
                        id: 'avgMonthSalary',
                        name: 'Средняя зарплата за день',
                        value: avgMonthSalary.toFixed(2) + ' р.',
                        iconUri: IconsUri.dollar,
                        color: Colors.green
                    })}  />
                    <Widget dataItem={DataItem.of({
                        id: 'avgMonthSalary',
                        name: 'Зарплата за месяц',
                        value: totalMonthSalary.toFixed(2) + ' р.',
                        iconUri: IconsUri.employeeSalary,
                        color: Colors.turquoise
                    })}  />
                </WidgetList>
            </ScreenContainer>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    btnStyle: {
        marginTop: 20
    },
});


export default MainScreenView;
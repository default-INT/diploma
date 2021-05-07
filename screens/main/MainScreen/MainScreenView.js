import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";

import Colors from "../../../constants/colors";
import {Widget, WidgetList} from "../../../components";
import {DataItem} from "../../../models";
import IconsUri from "../../../constants/icons";

const MainScreenView = ({navigation, ...props}) => {

    const {
        companyData,
        actualStorage,
        storageLoading,
        error
    } = props;

    if (companyData.error || error) {
        return (
            <View style={styles.centredScreen}>
                <Text>{companyData.error || error}</Text>
            </View>
        )
    }

    if (companyData.loading || storageLoading) {
        return (
            <View style={styles.centredScreen}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }
    const emptyData = new DataItem('c-empty-data1', 'Склад пуст', '',
        IconsUri.pallet, Colors.red);
    return (
        <ScrollView>
            <View style={styles.screen}>
                <WidgetList title='Информация о предприятии'>
                    <Widget dataItem={companyData.countEmployee}  />
                    <Widget dataItem={companyData.avgSalary}  />
                </WidgetList>
                <WidgetList title='Склад'>
                    {actualStorage.length !== 0 ? actualStorage.map(item => <Widget key={item.id} dataItem={item} />)
                     : <Widget dataItem={emptyData} />}
                </WidgetList>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});



export default MainScreenView
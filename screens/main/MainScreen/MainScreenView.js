import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";

import Colors from "../../../constants/colors";
import {Widget, WidgetList} from "../../../components";

const MainScreenView = ({navigation, ...props}) => {

    const {
        companyData,
        storageData,
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

    return (
        <ScrollView>
            <View style={styles.screen}>
                <WidgetList title='Информация о предприятии'>
                    <Widget dataItem={companyData.countEmployee}  />
                    <Widget dataItem={companyData.avgSalary}  />
                </WidgetList>
                <WidgetList title='Склад'>
                    {storageData.actualStorage.map(item => <Widget key={item.id} dataItem={item} />)}
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
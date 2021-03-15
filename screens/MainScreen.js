import React from "react";
import { ScrollView, StyleSheet, FlatList, View } from "react-native"
import { useSelector } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { MaterialHeaderButton } from "../components/UI"
import { Widget, WidgetList } from "../components";

const MainScreen = props => {
    const companyData = useSelector(state => state.company)
    const storageData = useSelector(state => state.storage)
    return (
        <ScrollView>
            <View style={styles.screen}>
                <WidgetList title='Информация о предприятии'>
                    <Widget dataItem={companyData.countEmployee}  />
                    <Widget dataItem={companyData.avgSalary}  />
                    <Widget dataItem={companyData.income}  />
                </WidgetList>
                <WidgetList title='Склад'>
                    {storageData.storage.map(item => <Widget key={item.id} dataItem={item} />)}
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
});

MainScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Pallet prod.',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default MainScreen
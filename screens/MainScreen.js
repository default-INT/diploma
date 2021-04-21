import React, { useEffect } from "react";
import {ScrollView, StyleSheet, FlatList, View, ActivityIndicator, Text} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import Colors from "../constants/colors";
import { companyActions } from "../store/actions";
import { MaterialHeaderButton } from "../components/UI"
import { Widget, WidgetList } from "../components";

const MainScreen = ({navigation, ...props}) => {
    const companyData = useSelector(state => state.company);
    const storageData = useSelector(state => state.storage);
    const dispatch = useDispatch();


    useEffect(() => {
        return navigation.addListener('focus',  () => {
            dispatch(companyActions.fetchAllCompanyData());
        });
    }, [navigation]);

    if (companyData.error) {
        return (
            <View style={styles.centredScreen}>
                <Text>{companyData.error}</Text>
            </View>
        )
    }

    if (companyData.loading) {
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
                    {/*<Widget dataItem={companyData.income}  />*/}
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
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export const mainScreenOptions = navData => {
    return {
        headerTitle: 'Pallet prod.',
        headerLeft: () => (
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
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Image, SafeAreaView, StyleSheet, View} from "react-native"
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer"
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

import {MainScreen} from "../screens"
import {mainScreenOptions} from "../screens/options"
import {lastReportsOptions} from "../screens/reports/options"
import {LastReportsScreen} from "../screens/reports"
import Colors from "../constants/colors"

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 5,
    },
    headerTitleStyle: {
        color: Colors.white,
    },
    headerBackTitleStyle: {

    },
    headerTintColor: Colors.white,
    headerTitle: 'Is screen'
};

const styles = StyleSheet.create({
    drawer: { flex: 1, paddingTop: 30 },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 80,
        height: 80
    }
})

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <MainStackNavigator.Screen
                name="Main"
                component={MainScreen}
                options={mainScreenOptions}
            />
        </MainStackNavigator.Navigator>
    )
}

const ReportStackNavigator = createStackNavigator();

export const ReportNavigator = () => {
    return (
        <ReportStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <ReportStackNavigator.Screen
                name="LastReports"
                component={LastReportsScreen}
                options={lastReportsOptions}
            />
        </ReportStackNavigator.Navigator>
    )
}

const PalletProdDrawerNavigator = createDrawerNavigator();

export const PalletProdNavigator = () => {
    return (
        <PalletProdDrawerNavigator.Navigator
            drawerContent={props => {
                return (
                    <View style={styles.drawer}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={require("../assets/icon.png")} />
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                )
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >

            <PalletProdDrawerNavigator.Screen
                name="Main"
                component={MainNavigator}
                options={{
                    drawerLabel: 'Главное',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="home"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Reports"
                component={ReportNavigator}
                options={{
                    drawerLabel: 'Отчёты',
                    drawerIcon: props => (
                        <Ionicons
                            name="md-calendar"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </PalletProdDrawerNavigator.Navigator>
    )
}



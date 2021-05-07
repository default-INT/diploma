import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {Image, SafeAreaView, View} from "react-native";
import Colors from "../constants/colors";
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {styles} from "./styles";
import {
    EmployeeNavigator,
    MainNavigator,
    PositionNavigator,
    ReportNavigator,
    StatisticNavigator,
    StorageNavigator, UnloadingNavigator
} from "./navigators";

const PalletProdDrawerNavigator = createDrawerNavigator();

const PalletProdNavigator = () => {
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

            <PalletProdDrawerNavigator.Screen
                name="Storage"
                component={StorageNavigator}
                options={{
                    drawerLabel: 'Склад',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="store"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Unloading"
                component={UnloadingNavigator}
                options={{
                    drawerLabel: 'Выгрузки со склада',
                    drawerIcon: props => (
                        <Entypo
                            name="export"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Employees"
                component={EmployeeNavigator}
                options={{
                    drawerLabel: 'Сотрудники',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="person"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Positions"
                component={PositionNavigator}
                options={{
                    drawerLabel: 'Тарифы',
                    drawerIcon: props => (
                        <MaterialIcons
                            name="work"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />

            <PalletProdDrawerNavigator.Screen
                name="Statistic"
                component={StatisticNavigator}
                options={{
                    drawerLabel: 'Статистика',
                    drawerIcon: props => (
                        <MaterialCommunityIcons
                            name="chart-line"
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </PalletProdDrawerNavigator.Navigator>
    )
}

export default PalletProdNavigator;
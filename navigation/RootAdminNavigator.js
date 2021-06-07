import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import Colors from "../constants/colors";
import {
    EmployeeNavigator,
    MainNavigator,
    PositionNavigator,
    ReportNavigator,
    StatisticNavigator,
    StorageNavigator,
    UnloadingNavigator
} from "./navigators/admin";
import DrawerPanel from "./DrawerPanel";

const PalletProdDrawerNavigator = createDrawerNavigator();

const PalletProdNavigator = () => {
    const {authUser} = useSelector(state => state.auth);
    return (
        <PalletProdDrawerNavigator.Navigator
            drawerContent={props => (<DrawerPanel authUser={authUser} {...props} />)}
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
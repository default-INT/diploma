import React from "react";
import {Alert, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {DrawerItemList} from "@react-navigation/drawer";
import {useDispatch} from "react-redux";

import {styles} from "./styles";
import {authActions, employeeActions} from "../store/actions";


const DrawerPanel = ({authUser, ...props}) => {
    const dispatch = useDispatch();
    const onLogOut = () => {
        Alert.alert('Выход с аккаунта', 'Вы действительно хотите выйти с учётной записи?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    dispatch(authActions.logOut());
                }
            }
        ]);
    }
    return (
        <View style={styles.drawer}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../assets/icon.png")} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileField}>{authUser.email}</Text>
                    <Text style={styles.profileField}>{authUser.getRoleName()}</Text>
                </View>
                <DrawerItemList {...props} />
                <TouchableOpacity onPress={onLogOut}>
                    <View style={styles.exitBtnContainer}>
                        <Text style={styles.exitBtn}>Выход</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
};

export default DrawerPanel;
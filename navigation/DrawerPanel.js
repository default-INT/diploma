import React from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {DrawerItemList} from "@react-navigation/drawer";

import {styles} from "./styles";


const DrawerPanel = ({authUser, ...props}) => {
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
                <TouchableOpacity>
                    <View style={styles.exitBtnContainer}>
                        <Text style={styles.exitBtn}>Выход</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
};

export default DrawerPanel;
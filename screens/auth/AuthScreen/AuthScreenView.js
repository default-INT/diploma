import React from "react";
import {Button, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

import {DefaultStyles} from "../../../styles";
import {LargeLoader} from "../../../components/UI";
import {Input} from "../../../components";
import {TitleText} from "../../../components/UI/texts";
import Colors from "../../../constants/colors";

const AuthScreenView = props => {
    const {
        loading,
        logInClick,
        formState,
        inputChangeHandler
    } = props;

    if (loading) {
        return (
            <LargeLoader/>
        );
    }

    return (
        <View
            style={{...DefaultStyles.defaultWhiteScreen, ...styles.screen}}>
            <View style={styles.fromContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require("../../../assets/icon.png")} />
                    </View>
                    <View style={{backgroundColor: Colors.primary, padding: 5, paddingHorizontal: 10}}>
                        <TitleText fontSize={28} style={{color: Colors.white, fontWeight: 'bold'}}>
                            АВТОРИЗАЦИЯ
                        </TitleText>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>
                                Email
                            </Text>
                        </View>
                        <View style={styles.input}>
                            <Input
                                id='email'
                                label='Введите email'
                                errorText='Введите корректный email!'
                                keyboardType="email-address"
                                onInputChange={inputChangeHandler}
                                initialValue={formState.inputValues.email}
                                initiallyValid={formState.inputValidities.email}
                                autoCorrect={false}
                                autoCompleteType='email'
                                autoCapitalize='none'
                                required
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.field}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>
                                Пароль
                            </Text>
                        </View>
                        <View style={styles.input}>
                            <Input
                                id='password'
                                label='Введите пароль'
                                errorText='Введите корректный пароль!'
                                keyboardType={Platform.OS === 'android' ? 'default' : 'default'}
                                onInputChange={inputChangeHandler}
                                initialValue={formState.inputValues.password}
                                initiallyValid={formState.inputValidities.password}
                                secureTextEntry={true}
                                autoCorrect={false}
                                autoCapitalize='none'
                                min={4}
                                max={20}
                                required
                            />
                        </View>
                    </View>
                </View>
                <SafeAreaView style={styles.btnContainer}>
                    <Button title='Войти' color={Colors.primary} onPress={logInClick} />
                </SafeAreaView>
            </View>
            <View
                style={styles.shortInfo}
            >
                <TouchableWithoutFeedback>
                    <Text style={styles.touchBtn}>Справка</Text>
                </TouchableWithoutFeedback>
                <View style={{...styles.littleField}}>
                    <Text style={styles.littleText}>Директор: +375 (29) 832-65-86 - Белый Ю.Н.</Text>
                </View>
                <View style={styles.littleField}>
                    <Text style={styles.littleText}>Руководитель отдела: +375 (33) 315-74-25 - Трофимов В.С.</Text>
                </View>
                <View style={styles.littleField}>
                    <Text style={styles.littleText}>Developed by evgeniy.trofimov.int@gmail.com - Trofimov E.V.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {

        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    fromContainer: {
        flex: 1,
        padding: 10,
        width: '90%'
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 200,
        height: 200
    },
    titleContainer: {
        alignItems: 'center'
    },
    field: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    littleField: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    littleText: {
        fontSize: 10
    },
    input: {
        flexGrow: 1,
        marginLeft: 20
    },
    labelContainer: {
        width: 50
    },
    btnContainer: {
        flex:1,
        marginTop: 20,
        paddingHorizontal: 80
    },
    shortInfo: {
        alignItems: 'center',
        marginBottom: 20
    },
    touchBtn: {
        color: Colors.primary
    }
});

export default AuthScreenView;
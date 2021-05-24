import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {View, Image} from "react-native";

import {authActions} from "../store/actions";
import {DefaultStyles} from "../styles";

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(authActions.loadTokens());
        } catch (e) {
            console.log(e.message);
        }
    }, []);
    return (
        <View style={{...DefaultStyles.centredScreen}}>
            <Image
                source={require("../assets/splash.png")}
                style={{width: '100%', height: '100%'}}
            />
        </View>
    )
}

export default StartupScreen;
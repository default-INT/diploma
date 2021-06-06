import React from "react";
import {useSelector} from "react-redux";
import MainApp from "./MainApp";

import {LogInScreen, StartupScreen} from "../components/screens";

const AppRouter = (props) => {
    const isAuthUser = useSelector(state => !!state.auth.authUser);
    const {didTryAutoLogin} = useSelector(state => state.auth);
    return (
        <>
            {isAuthUser && <MainApp />}
            {!isAuthUser && !didTryAutoLogin && <StartupScreen/>}
            {!isAuthUser && didTryAutoLogin && <LogInScreen/>}
        </>
    );
};

export {AppRouter};
import React from "react";
import {useSelector} from "react-redux";
import MainApp from "./MainApp";

import {StartupScreen} from "../components/screens/StartupScreen";

const AppRouter = (props) => {
    const isAuthUser = useSelector(state => !!state.auth.authUser);
    const {didTryAutoLogin} = useSelector(state => state.auth);
    return (
        <>
            {isAuthUser && <MainApp />}
            {!isAuthUser && !didTryAutoLogin && <StartupScreen/>}
        </>
    );
};

export {AppRouter};
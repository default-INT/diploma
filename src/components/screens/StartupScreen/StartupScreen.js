import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import {authActions} from "../../../store/action-creators";
import {CubeLoader} from "../../utils";
import styles from "./StartupScreen.module.css";

const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.tryAutoLogin());
    }, []);

    return (
        <div className={styles.screen}>
            <CubeLoader />
        </div>
    )
}

export default StartupScreen;
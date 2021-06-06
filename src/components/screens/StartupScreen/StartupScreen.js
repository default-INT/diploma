import React from "react";

import {CubeLoader} from "../../utils";
import styles from "./StartupScreen.module.css";

const StartupScreen = (props) => {

    return (
        <div className={styles.screen}>
            <CubeLoader />
        </div>
    )
}

export default StartupScreen;
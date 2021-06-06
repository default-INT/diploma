import React from "react";

import './fonts/roboto.css'
import './App.css';
import {AppRouter} from "./router";
import {initAxios} from "./util/request-config";

function App() {
    initAxios();
    return (
        <AppRouter/>
    );
}

export default App;

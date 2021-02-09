import avatar from './img/avatar.jpg';
import './fonts/roboto.css'
import './App.css';
import React from "react";
import Header from "./components/Header";
import MainScreen from "./components/screens/MainScreen";
import NavMenu from "./components/NavMenu";
import PositionScreen from "./components/screens/PositionScreen";
import {Route, Switch} from "react-router-dom";
import EmployeeScreen from "./components/screens/EmployeeScreen";

function App() {
    const user = {
        username: 'Admin',
        avatarPath: avatar
    }
    return (
        <div className="App">
            <NavMenu/>
            <main>
                <Header user={user} />
                <Switch>
                    <Route exact component={MainScreen} path="/"/>
                    <Route exact component={PositionScreen} path="/positions"/>
                    <Route exact component={EmployeeScreen} path="/employees"/>
                </Switch>
            </main>
        </div>
    );
}

export default App;

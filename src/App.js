import avatar from './img/avatar.jpg';
import './fonts/roboto.css'
import './App.css';
import React from "react";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";
import NavMenu from "./components/NavMenu";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";

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
                </Switch>
            </main>

        </div>
    );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom"
import {EmployeeScreen, Header, MainScreen, NavMenu, PositionScreen, ReportScreen, AddReportScreen} from './components'
import avatar from './img/avatar.jpg';
import './fonts/roboto.css'
import './App.css';

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
                    <Route exact component={ReportScreen} path="/reports"/>
                    <Route exact component={PositionScreen} path="/positions"/>
                    <Route exact component={EmployeeScreen} path="/employees"/>
                    <Route exact component={AddReportScreen} path="/add-report"/>
                </Switch>
            </main>
        </div>
    );
}

export default App;

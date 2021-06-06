import React from "react";
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";

import {
    AddReportScreen,
    EmployeeScreen,
    Header,
    MainScreen,
    NavMenu,
    PositionScreen,
    ReportScreen
} from "../components";



const MainApp = (props) => {
    const {authUser} = useSelector(state => state.auth);
    return (
        <div className="App">
            <NavMenu/>
            <main>
                <Header user={authUser} />
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

export default MainApp;
import React from 'react'
import {Widget} from "../widgets/Widget";
import dollar from "../../icon/dollar.svg";
import palletIcon from "../../icon/pallet.svg";
import employeesIcon from "../../icon/employee.svg";
import salaryIcon from "../../icon/salary.svg";
import {SimpleFragment} from "../fragments/SimpleFragment";
import '../../css/MainContent.css'

const MainScreen = () => {
    return (
        <div className="main-content">
            <div className="content-title">Dashbord</div>
            <div className="widget-list">
                <Widget title='INCOME' value='5000$' color='#1cc98a' icon={dollar} />
                <Widget title='COUNT EMPLOYEES' value='15' color='#36b9cd' icon={employeesIcon} />
                <Widget title='NUMBER OF PALLETS' value='210' color='#f7c33c' icon={palletIcon} />
                <Widget title='TOTAL SALARY (MONTH)' value='210$' color='#5072e0' icon={salaryIcon} />
            </div>
            <div className="fragment-list">
                <SimpleFragment title="Fragment">Content</SimpleFragment>
            </div>
        </div>
    )
}

export default MainScreen
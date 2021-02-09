import React from 'react'
import {Widget} from "../widgets/Widget";
import dollar from "../../icon/dollar.svg";
import palletIcon from "../../icon/pallet.svg";
import employeesIcon from "../../icon/employee.svg";
import salaryIcon from "../../icon/salary.svg";
import {SimpleFragment} from "../fragments/SimpleFragment";
import WidgetList from "../widgets/WidgetList";
import '../../css/MainContent.css'
import FragmentList from "../fragments/FragmentList";

const MainScreen = () => {
    return (
        <div className="main-content">
            <div className="content-title">Dashbord</div>
            <WidgetList>
                <Widget title='INCOME' value='5000$' color='#1cc98a' icon={dollar} />
                <Widget title='COUNT EMPLOYEES' value='15' color='#36b9cd' icon={employeesIcon} />
                <Widget title='NUMBER OF PALLETS' value='210' color='#f7c33c' icon={palletIcon} />
                <Widget title='TOTAL SALARY (MONTH)' value='210$' color='#5072e0' icon={salaryIcon} />
            </WidgetList>
            <FragmentList>
                <SimpleFragment title="Fragment">Content</SimpleFragment>
            </FragmentList>
        </div>
    )
}

export default MainScreen
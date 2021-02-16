import React from 'react'
import {SimpleFragment, Widget, FragmentList, WidgetList} from "../index";
import {salaryIcon, employeeIcon, palletIcon, dollarIcon} from "../../icons";
import '../../css/MainContent.css'

const MainScreen = () => {
    return (
        <div className="main-content">
            <div className="content-title">Dashbord</div>
            <WidgetList>
                <Widget title='INCOME' value='5000$' color='#1cc98a' icon={dollarIcon} />
                <Widget title='COUNT EMPLOYEES' value='15' color='#36b9cd' icon={employeeIcon} />
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
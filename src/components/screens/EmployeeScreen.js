import React from "react";
import {Widget} from "../widgets/Widget";
import ControlFragment from "../fragments/ControlFragment"
import WidgetList from "../widgets/WidgetList";
import FragmentList from "../fragments/FragmentList";
import employeeIcon from '../../icon/builder.svg'

class EmployeeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-content">
                <div className="content-title">Сотрудники</div>
                <WidgetList style={{
                    justifyContent: 'left'
                }}>
                    <Widget title='ЛУЧШИЙ СОТРУДНИК' value='Трофимов В.С.' color='#1cc98a' icon={employeeIcon} />
                </WidgetList>
                <FragmentList>
                    <ControlFragment title='Сотрудникики' style={{width: '100%'}}>

                    </ControlFragment>
                </FragmentList>
            </div>
        )
    }
}

export default EmployeeScreen
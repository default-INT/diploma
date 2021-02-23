import React from "react";
import {connect} from "react-redux";

import {builderIcon} from '../../icons'
import {
    ContentTitle,
    ControlFragment,
    EmployeeModal,
    EmployeesTable,
    FragmentList,
    MainContent,
    Widget,
    WidgetList
} from "../";
import {createEmployee} from "../../store/actions";

class EmployeeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onModalState: false
        }
    }

    closeModal() {
        this.setState(prev => ({
            ...prev,
            onModalState: false
        }))
    }

    openModal() {
        this.setState(prev => ({
            ...prev,
            onModalState: true
        }))
    }

    render() {
        return (
            <MainContent>
                <ContentTitle>Сотрудники</ContentTitle>
                <WidgetList style={{
                    justifyContent: 'left'
                }}>
                    <Widget title='ЛУЧШИЙ СОТРУДНИК' value='Трофимов В.С.' color='#1cc98a' icon={builderIcon} />
                </WidgetList>
                <FragmentList>
                    {this.state.onModalState ? <EmployeeModal onModalState={() => this.closeModal()} action={employee => this.props.createEmployee(employee)}/> : null}
                    <ControlFragment title='Сотрудникики' style={{width: '100%'}} onClick={() => this.openModal()}>
                        <EmployeesTable />
                    </ControlFragment>
                </FragmentList>
            </MainContent>
        )
    }
}

const mapDispatchToProps  = {
    createEmployee
}

export default connect(null, mapDispatchToProps)(EmployeeScreen)
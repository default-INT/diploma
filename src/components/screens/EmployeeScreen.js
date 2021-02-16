import React from "react";
import {builderIcon} from '../../icons'
import {ControlFragment, EmployeeModal, EmployeesTable, FragmentList, Widget, WidgetList} from "../";
import {createEmployee} from "../../store/actions";
import {connect} from "react-redux";

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
            <div className="main-content">
                <div className="content-title">Сотрудники</div>
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
            </div>
        )
    }
}

const mapDispatchToProps  = {
    createEmployee
}

export default connect(null, mapDispatchToProps)(EmployeeScreen)
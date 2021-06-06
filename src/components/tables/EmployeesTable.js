import React, {Fragment} from "react"
import {connect} from "react-redux";
import {createEmployee, deleteEmployee, fetchEmployees, updateEmployee} from "../../store/actions";
import {ConfirmModalWindow, CubeLoader, EmployeeModal} from "../";
import {EditableTable, PaginationBtn} from "./index";

class EmployeesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10,
            fullName: '',
            fired: false,
            onModalState: false,
            actualModal: null
        }
    }
    header = ['ФИО', 'Год рождения']

    dataParser = employee => ([
        `${employee.lastName} ${employee.firstName.charAt(0)}. ${employee.secondName.charAt(0)}`,
        employee.birthdayYear
    ])

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({
            ...prev,
            ...{
                [event.target.name]: event.target.value === 'on' ?
                    event.target.checked : event.target.value
            }
        }))
    }

    refreshEmployees = (event) => {
        event && event.preventDefault()
        this.props.fetchEmployees(
            this.state.page,
            this.state.size,
            this.state.fullName,
            this.state.fired
        )
    }

    componentDidMount() {
        this.refreshEmployees()
    }

    closeModal() {
        this.setState(prev => ({
            ...prev,
            onModalState: false
        }))
    }

    openEditModal = (employee) => {
        this.setState(prev => ({
            ...prev,
            actualModal: (<EmployeeModal
                title='Редактирование сотрудника'
                onModalState={() => this.closeModal()}
                employee={employee}
                action={employee => this.props.updateEmployee(employee)}
            />),
            onModalState: true
        }))
    }

    openDeleteModal = employee => {
        this.setState(prev => ({
            ...prev,
            actualModal: (<ConfirmModalWindow
                title={'Вы уверены что хотите уволить сотрудника?'}
                onModalState={() => this.closeModal()}
                actionName={'Уволить'}
                action={() => this.props.deleteEmployee(employee)}
            />),
            onModalState: true
        }))
    }

    loadPage(page) {
        this.setState(prev => ({
            ...prev,
            page: page
        }))
        this.props.fetchEmployees(
            page,
            this.state.size,
            this.state.fullName,
            this.state.fired
        )
    }

    render() {
        const { loading, employees } = this.props;
        console.log(employees);
        return (
            <Fragment>
                {this.state.onModalState ? this.state.actualModal : null}
                <form className='search-form' onSubmit={this.refreshEmployees}>
                    <input type="text" name='fullName' placeholder='ФИО' onChange={this.changeInputHandler}/>
                    <label className="checkbox-block">
                        Уволен
                        <input name="fired" type="checkbox" onChange={this.changeInputHandler}/>
                    </label>
                    <a className="default-btn" onClick={this.refreshEmployees}>
                        Поиск
                    </a>
                </form>
                {loading ? <CubeLoader />
                    : employees.length !== 0 ?
                        <EditableTable
                            data={employees}
                            header={this.header}
                            dataParser={this.dataParser}
                            onEditItem={employee => this.openEditModal(employee)}
                            onDeleteItem={employee => this.openDeleteModal(employee)}
                        >
                            {this.props.count > this.state.size ?
                                <PaginationBtn
                                    size={this.state.size}
                                    count={this.props.count}
                                    currentPage={this.state.page}
                                    loadPage={page => this.loadPage(page)}
                                /> :
                                null
                            }
                        </EditableTable>
                        : <div>Нет данных</div>
                    }
            </Fragment>
        )
    }
}



const mapStateToProps = state => ({
    employees: state.employees.employees,
    count: state.employees.count,
    loading: state.app.loading
})

const mapDispatchToProps  = {
    createEmployee, updateEmployee, deleteEmployee, fetchEmployees
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesTable)
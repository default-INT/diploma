import { showLoader, hideLoader, showAlert, hideAlert } from './appActions'
import { fetchPositions, deletePosition, updatePosition, createPosition } from './positionActions'
import { fetchEmployees as fetchAllNotFiredEmployees, fetchEmployees, updateEmployee, addEmployees as createEmployee, fireEmployee as deleteEmployee, getCountEmployees } from './employeeActions'

export {
    showLoader, hideAlert, hideLoader, showAlert,
    fetchPositions, createPosition, deletePosition, updatePosition,
    fetchAllNotFiredEmployees, fetchEmployees, updateEmployee, createEmployee, deleteEmployee, getCountEmployees
}
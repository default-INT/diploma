import { showLoader, hideLoader, showAlert, hideAlert } from './appActions'
import { fetchPosition as fetchPositions, deletePosition, updatePosition, addPosition as createPosition } from './positionActions'
import { fetchEmployees as fetchAllNotFiredEmployees, fetchEmployees, updateEmployee, addEmployees as createEmployee, fireEmployee as deleteEmployee, getCountEmployees } from './employeeActions'

export * as storageActions from "./storageActions";

export {
    showLoader, hideAlert, hideLoader, showAlert,
    fetchPositions, createPosition, deletePosition, updatePosition,
    fetchAllNotFiredEmployees, fetchEmployees, updateEmployee, createEmployee, deleteEmployee, getCountEmployees
};
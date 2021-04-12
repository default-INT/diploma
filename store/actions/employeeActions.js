import {Employee} from "../../models";
import {EMPLOYEE_TYPES} from "../../constants/types";
import {SERVER_URL} from "../../constants";


export const fetchEmployees = () => {
    return async dispatch => {
        dispatch({type: EMPLOYEE_TYPES.START_LOADING});
        dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/employees`);
            if (!response.ok) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: 'Не удалось получить данные о сотрудниках. Status: ' + response.status
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const employees = await response.json();
            dispatch({
                type: EMPLOYEE_TYPES.FETCH_ALL,
                payload: employees.map(employee => Employee.of(employee))
            });
        } catch (err) {
            dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: EMPLOYEE_TYPES.END_LOADING});
    }
};

export const addEmployees = employee => {
    return async dispatch => {
        dispatch({type: EMPLOYEE_TYPES.START_LOADING});
        dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Employee.of(employee))
            });
            if (!response.ok) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: 'Не удалось добавить сотрудника. Status: ' + response.status
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const newEmployee = await response.json();
            dispatch({
                type: EMPLOYEE_TYPES.ADD_EMPLOYEE,
                payload: Employee.of(newEmployee)
            });
        } catch (err) {
            dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: EMPLOYEE_TYPES.END_LOADING});
    }
};

export const fireEmployee = employeeId => {
    return async dispatch => {
        dispatch({type: EMPLOYEE_TYPES.START_LOADING});
        dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/employees/fire`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: employeeId
                })
            });
            if (!response.ok) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: 'Не удалось уволить сотрудника. Status: ' + response.status
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const answer = await response.json();
            if (answer) {
                dispatch({
                    type: EMPLOYEE_TYPES.FIRE_EMPLOYEE,
                    payload: employeeId
                });
            } else {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: 'Не удалось уволить сотрудника. Status: ' + response.status
                });
            }
        } catch (err) {
            dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: EMPLOYEE_TYPES.END_LOADING});
    }
};

export const updateEmployee = employee => {
    return async dispatch => {
        dispatch({type: EMPLOYEE_TYPES.START_LOADING});
        dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: null});
        try {
            const response = await fetch(`${SERVER_URL}/employees`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: 'Не удалось обновить данные о сотруднике. Status: ' + response.status
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const upEmployee = await response.json();
            dispatch({
                type: EMPLOYEE_TYPES.UPDATE_EMPLOYEE,
                payload: Employee.of(upEmployee)
            });
        } catch (err) {
            dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: EMPLOYEE_TYPES.END_LOADING});
    }
};
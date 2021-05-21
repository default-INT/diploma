import {Employee} from "../../models";
import {EMPLOYEE_TYPES} from "../../constants/types";
import axios from "axios";
import {getResponseErrorText} from "../../utils";


export const fetchEmployees = () => {
    return async dispatch => {
        dispatch({type: EMPLOYEE_TYPES.START_LOADING});
        dispatch({type: EMPLOYEE_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.get(`/employees`);
            if (response.status !== 200) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось получить данные о сотрудниках')
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const employees = response.data;
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
            const response = await axios.post(`/employees`, Employee.of(employee));
            if (response.status !== 200) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось добавить сотрудника')
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const newEmployee = response.data;
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
            const response = await axios.delete(`/employees/fire/` + employeeId);
            if (response.status !== 200) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось уволить сотрудника')
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const answer = response.data;
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
            const response = await axios.put(`/employees`, employee);

            if (response.status !== 200) {
                dispatch({
                    type: EMPLOYEE_TYPES.SET_ERROR,
                    payload: getResponseErrorText(response, 'Не удалось обновить данные о сотруднике')
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const upEmployee = response.data;
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
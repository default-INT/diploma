import {hideLoader, showCreateError, showDeleteError, showFetchError, showLoader, showUpdateError} from "./appActions";
import {api} from "../api";
import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES, SERVER_URL, UPDATE_EMPLOYEE} from "../../types";

export function fetchEmployees(page, size, lastName, fired) {
    return async dispatch => {
        try {
            dispatch(showLoader())

            const url = new URL(SERVER_URL + `/employees/${page}`)

            size && url.searchParams.append('size', size)
            lastName && url.searchParams.append('lastName', lastName)
            fired && url.searchParams.append('fired', fired)

            const response = await api.get(url.toString())
            const employees = await response.json()

            dispatch({ type: FETCH_EMPLOYEES, payload: employees})
            dispatch(hideLoader())
        } catch (e) {
            console.error(e)
            dispatch(showFetchError(e))
        }
    }
}

export function fetchAllNotFiredEmployees(lastName) {
    return async dispatch => {
        try {
            dispatch(showLoader())

            const url = new URL(SERVER_URL + '/employees')

            lastName && url.searchParams.append('lastName', lastName)

            const response = await api.get(url.toString())
            const employees = await response.json()

            dispatch({ type: FETCH_EMPLOYEES, payload: employees})
            dispatch(hideLoader())
        } catch (e) {
            console.error(e)
            dispatch(showFetchError(e))
        }
    }
}

export function createEmployee(employee) {
    return async dispatch => {
        try {
            const response = await api.post(SERVER_URL + '/employees', {
                body: JSON.stringify(employee)
            })
            const newEmployee = await response.json()
            dispatch({ type: CREATE_EMPLOYEE, payload: newEmployee })
        } catch (e) {
            dispatch(showCreateError(e))
        }
    }
}

export function updateEmployee(employee) {
    return async dispatch => {
        try {
            const response = await api.put(SERVER_URL + '/employees', {
                body: JSON.stringify(employee)
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const updateEmployee = await response.json()
            dispatch({ type: UPDATE_EMPLOYEE, payload: updateEmployee})
        } catch (e) {
            dispatch(showUpdateError(e))
        }
    }
}

export function deleteEmployee(employee) {
    return async dispatch => {
        try {
            const response = await api.delete(SERVER_URL + '/employees', {
                body: JSON.stringify(employee)
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            dispatch({ type: DELETE_EMPLOYEE, payload: employee })
        } catch (e) {
            dispatch(showDeleteError(e))
        }
    }
}
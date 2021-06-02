/**
 * В данном файле описаны "actions" для управления данными о предприятии.
 *
 * Асинхроность реализована с помощью библиотеки Redux Thunk.
 * HTTP-запросы выполняются с помощью библиотеки Axios.
 */
import axios from "axios";

import {DataItem} from "../../models";
import {COMPANY_TYPES, EMPLOYEE_TYPES} from "../../constants/types";
import IconsUri from "../../constants/icons";
import Colors from "../../constants/colors";


/**
 * Получение данных о бизнес-процессах предприятия.
 *
 * @returns {function(*): Promise<void>}
 */
export const fetchAllCompanyData = () => {
    return async dispatch => {
        dispatch({type: COMPANY_TYPES.START_LOADING});
        await dispatch(fetchAvgSalaryOnDay());
        await dispatch(fetchCountEmployees());
        dispatch({type: COMPANY_TYPES.END_LOADING});
    }
}

/**
 * Получение данных о средней заработной плате сотрудников за день.
 *
 * @returns {function(*): Promise<undefined>}
 */
export const fetchAvgSalaryOnDay = () => {
    return async dispatch => {
        dispatch({type: COMPANY_TYPES.START_LOADING}); //TODO: ???
        dispatch({type: COMPANY_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.get('/palletprod/avg-salary');
            if (response.status !== 200) {
                dispatch({
                    type: COMPANY_TYPES.SET_ERROR,
                    payload: `Не удалось получить данные о средней зарплате. Status: ${response.status} ${response.statusText}`
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const avgSalaryOnDay = response.data;
            dispatch({
                type: COMPANY_TYPES.FETCH_AVG_SALARY_ON_DAY,
                payload: new DataItem("avgSalaryOnDay", "Средняя зарплата за день", `${avgSalaryOnDay}р`, IconsUri.employeeSalary, Colors.turquoise)
            })
        } catch (err) {
            dispatch({type: COMPANY_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: COMPANY_TYPES.END_LOADING});
    }
}

/**
 * Получение данных о количестве сотрудников работающих на предприятии.
 *
 * @returns {function(*): Promise<undefined>}
 */
export const fetchCountEmployees = () => {
    return async dispatch => {
        dispatch({type: COMPANY_TYPES.START_LOADING}); // ???
        dispatch({type: COMPANY_TYPES.SET_ERROR, payload: null});
        try {
            const response = await axios.get(`/employees/count`);
            if (response.status !== 200) {
                dispatch({
                    type: COMPANY_TYPES.SET_ERROR,
                    payload: `Не удалось получить данные о количестве сотрудников. Status: ` + response.status
                });
                dispatch({type: EMPLOYEE_TYPES.END_LOADING});
                return;
            }
            const countEmployee = response.data;
            dispatch({
                type: COMPANY_TYPES.FETCH_COUNT_EMPLOYEES,
                payload: new DataItem("countEmployee", "Количество сотрудников", countEmployee, IconsUri.employees, Colors.orange)
            })
        } catch (err) {
            dispatch({type: COMPANY_TYPES.SET_ERROR, payload: err.message});
        }
        dispatch({type: COMPANY_TYPES.END_LOADING});
    }
}
import axios from "axios";

export const fetchTotalSalaryOnMonth = () => {
    return async dispatch => {
        const response = await axios.get('/palletprod/my-month-avg-salary')
        if (response.status !== 200) {
            throw new Error()
        }
    }
}
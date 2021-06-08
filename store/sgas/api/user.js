import axios from "axios";

export const getAvgMonthSalary = () => (
    axios.get('/palletprod/my-avg-salary')
);

export const getTotalMonthSalary = () => (
    axios.get('/palletprod/my-month-total-salary')
);
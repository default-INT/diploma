import axios from "axios";

export const getAvgSalary = () => (
    axios.get('/palletprod/avg-salary')
);

export const getCountEmployees = () => (
    axios.get(`/employees/count`)
);
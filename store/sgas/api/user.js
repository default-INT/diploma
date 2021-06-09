import axios from "axios";

export const getAvgMonthSalary = () => (
    axios.get('/user-employee/my-avg-salary')
);

export const getTotalMonthSalary = () => (
    axios.get('/user-employee/my-month-total-salary')
);

export const getUserReports = () => (
    axios.get('/user-employee/reports')
)

export const getUserStatistics = () => (
    axios.get('/user-employee/statistics')
)
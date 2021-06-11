import axios from "axios";


export const getMonthlyReports = (month, year) => (
    axios.get(`/reports`, {
        params: {
            month, year
        }
    })
);
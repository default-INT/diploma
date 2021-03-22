export default class Report {

    /**
     *
     * @param id {string}
     * @param date {Date}
     * @param employeeItems {Array<EmployeeItem>}
     * @param dayStats {Array<DayStat>}
     * @param totalSalary {number}
     */
    constructor(id, date, employeeItems, dayStats, totalSalary) {
        this.id = id;
        this.date = date;
        this.employeeItems = employeeItems;
        this.dayStats = dayStats;
    }
}
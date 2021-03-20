export default class Report {

    /**
     *
     * @param id {string}
     * @param date {Date}
     * @param workItems {Array<WorkItem>}
     * @param dayStats {Array<DayStat>}
     * @param totalSalary {number}
     */
    constructor(id, date, workItems, dayStats, totalSalary) {
        this.id = id;
        this.date = date;
        this.workItems = workItems;
        this.dayStats = dayStats;
    }
}
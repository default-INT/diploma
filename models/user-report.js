/**
 * Описывает отчёт за день для сотрудника.
 */
import WorkItem from "./work-item";

export default class UserReport {
    /**
     *
     * @param employeeItemId {string}
     * @param date {Date}
     * @param workItems {Array<WorkItem>}
     * @param totalSalary {number}
     */
    constructor(employeeItemId, date, workItems, totalSalary) {
        this.employeeItemId = employeeItemId;
        this.date = date;
        this.workItems = workItems;
        this.totalSalary = totalSalary;
    }

    /**
     *
     * @param employeeItemId {string}
     * @param date {string}
     * @param workItems {Array<object>}
     * @param totalSalary {number}
     * @return userReport {UserReport}
     */
    static fromJson({employeeItemId, date, workItems, totalSalary}) {
        return new UserReport(
            employeeItemId,
            new Date(date),
            workItems.map(workItem => WorkItem.of(workItem)),
            +totalSalary
        );
    }
}
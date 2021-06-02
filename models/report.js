import EmployeeItem from "./employee-item";
import DayStat from "./day-stat";

/**
 * Описывает отчёт за день.
 */
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
        this.totalSalary = totalSalary;
    }

    /**
     * Преобразование отчёта в формат запроса для сервера.
     *
     * @param report
     * @returns {{date, employeeItems}}
     */
    static toHttpRequestFormat(report) {
        return {
            date: report.date,
            employeeItems: report.employeeItems.map(employeeItem => ({
                employeeId: employeeItem.employee.id,
                totalSalary: employeeItem.totalSalary,
                workItems: employeeItem.workItems.map(workItem => ({
                    itemNum: workItem.itemNum,
                    positionId: workItem.position.id
                }))
            }))
        }
    }

    /**
     * Преобразование отчёта в формат запроса для сервера.
     *
     * @returns {{date: Date, employeeItems: {totalSalary: number, workItems: *, employeeId: string}[]}}
     */
    toReq = () => {
        return {
            date: this.date,
            employeeItems: this.employeeItems.map(employeeItem => ({
                employeeId: employeeItem.employee.id,
                totalSalary: employeeItem.totalSalary,
                workItems: employeeItem.workItems.map(workItem => ({
                    itemNum: workItem.itemNum,
                    positionId: workItem.position.id
                }))
            }))
        }
    }

    static of(reportObj) {
        return new Report(
            reportObj.id,
            new Date(reportObj.date),
            reportObj.employeeItems.map(employeeItem => EmployeeItem.of(employeeItem)),
            reportObj.dayStats.map(dayStat => DayStat.of(dayStat)),
            reportObj.totalSalary
        )
    }
}
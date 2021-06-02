import Employee from "./employee";
import WorkItem from "./work-item";

/**
 * Описывает количество выполненной работы сотрудником.
 */
export default class EmployeeItem {
    /**
     *
     * @param {string} id
     * @param {Employee} employee
     * @param {Array<WorkItem>} workItems
     * @param {number} totalSalary
     */
    constructor(id, employee, workItems, totalSalary) {
        this.id = id;
        this.employee = employee;
        this.workItems = workItems;
        this.totalSalary = totalSalary;
    }

    static of(employeeItem) {
        return new EmployeeItem(
            employeeItem.id,
            Employee.of(employeeItem.employee),
            employeeItem.workItems.map(workItem => WorkItem.of(workItem)),
            employeeItem.totalSalary
        )
    }
}
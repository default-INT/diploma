export default class EmployeeItem {
    /**
     *
     * @param {string} id
     * @param {Employee} employee
     * @param {WorkItem} workItems
     * @param {number} totalSalary
     */
    constructor(id, employee, workItems, totalSalary) {
        this.id = id;
        this.employee = employee;
        this.workItems = workItems;
        this.totalSalary = totalSalary;
    }
}
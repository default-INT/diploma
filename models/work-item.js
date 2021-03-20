export default class WorkItem {
    /**
     *
     * @param id {string}
     * @param employee {Employee}
     * @param position {Position}
     * @param itemNum {number}
     * @param salary {number}
     */
    constructor(id, employee, position, itemNum, salary) {
        this.id = id;
        this.employee = employee;
        this.position = position;
        this.itemNum = itemNum;
        this.salary = salary;
    }
}
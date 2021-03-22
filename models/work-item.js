export default class WorkItem {
    /**
     *
     * @param id {string}
     * @param position {Position}
     * @param itemNum {number}
     * @param salary {number}
     */
    constructor(id, position, itemNum, salary) {
        this.id = id;
        this.position = position;
        this.itemNum = itemNum;
        this.salary = salary;
    }
}
import Position from "./position";

/**
 * Описывает единицу работы выполненной сотрудником.
 */
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

    static of(workItem) {
        return new WorkItem(
            workItem.id,
            Position.of(workItem.position),
            workItem.itemNum,
            workItem.salary
        )
    }
}
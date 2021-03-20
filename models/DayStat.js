export default class DayStat {
    /**
     *
     * @param id {number}
     * @param position {Position}
     * @param totalNum {number}
     * @param totalSalary {number}
     */
    constructor(id, position, totalNum, totalSalary) {
        this.id = id;
        this.position = position;
        this.totalNum = totalNum;
        this.totalSalary = totalSalary;
    }
}
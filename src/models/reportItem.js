/**
 * @deprecated 03.06.2021 - 17:50
 */
export default class ReportItem {
    /**
     *
     * @param id {string}
     * @param employee {Employee}
     * @param works {Array<Work>}
     */
    constructor(id, employee, works) {
        this.id = id;
        this.employee = employee;
        this.works = works
    }
}
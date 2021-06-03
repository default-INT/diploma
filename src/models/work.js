export default class Work {
    /**
     *
     * @param id {string}
     * @param positionItem {PositionItem}
     * @param comment {string}
     * @param itemCount {number}
     * @param sum {number}
     */
    constructor(id, positionItem, comment, itemCount, sum) {
        this.id = id;
        this.positionItem = positionItem;
        this.comment = comment;
        this.itemCount = itemCount;
        this.sum = sum;
    }
}
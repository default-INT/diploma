export default class PositionItem {
    /**
     *
     * @param id {string}
     * @param name {string}
     * @param itemTariff {number}
     * @param itemName {string}
     * @param current {boolean}
     */
    constructor(id, name, itemTariff, itemName, current) {
        this.id = id;
        this.name = name;
        this.itemTariff = itemTariff;
        this.itemName = itemName;
        this.current = current
    }
}
export default class Position {
    /**
     *
     * @param id {string}
     * @param name {string}
     * @param itemTariff {number}
     * @param itemName {string}
     * @param isPallet {boolean}
     * @param isStorage {boolean}
     */
    constructor(id, name, itemTariff, itemName, isPallet, isStorage) {
        this.id = id;
        this.name = name;
        this.itemTariff = itemTariff;
        this.itemName = itemName;
        this.isPallet = isPallet;
        this.isStorage = isStorage;
    }
}
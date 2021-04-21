export default class DataItem {
    /**
     *
     * @param id {string}
     * @param name {string}
     * @param value {number|string}
     * @param iconUri {string}
     * @param color {string}
     */
    constructor(id, name, value, iconUri, color) {
        this.id = id
        this.name = name
        this.value = value
        this.iconUri = iconUri
        this.color = color
    }
}
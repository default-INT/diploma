export default class Employee {
    /**
     *
     * @param id {string}
     * @param firstName {string}
     * @param secondName {string}
     * @param lastName {string}
     * @param birthdayYear {number}
     */
    constructor(id, firstName, secondName, lastName, birthdayYear) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastName = lastName;
        this.birthdayYear = birthdayYear;
    }
}
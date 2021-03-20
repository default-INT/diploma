export default class Employee {
    /**
     *
     * @param id {string}
     * @param lastName {string}
     * @param firstName {string}
     * @param secondName {string}
     * @param birthdayYear {number}
     * @param phoneNumber {string}
     * @param userId {string}
     */
    constructor(id, lastName, firstName, secondName, birthdayYear, phoneNumber, userId) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.secondName = secondName;
        this.birthdayYear = birthdayYear;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
    }

    get fullName() {
        return `${this.lastName} ${this.firstName.charAt(0)}. ${this.secondName.charAt(0)}.`
    }
}
export default class Employee {
    constructor(id, lastName, firstName, secondName, birthdayYear, userId) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.secondName = secondName;
        this.birthdayYear = birthdayYear;
        this.userId = userId;
    }

    get fullName() {
        return `${this.lastName} ${this.firstName.charAt(0)}. ${this.secondName.charAt(0)}.`
    }
}
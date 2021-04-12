export default class Employee {
    /**
     *
     * @param id {string}
     * @param lastName {string}
     * @param firstName {string}
     * @param secondName {string}
     * @param birthdayYear {number}
     * @param phoneNumber {string}
     * @param userId {string|null|undefined}
     * @param isFired {boolean}
     * @param isDeleted {boolean}
     */
    constructor(id, lastName, firstName, secondName, birthdayYear, phoneNumber, userId, isFired, isDeleted) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.secondName = secondName;
        this.birthdayYear = birthdayYear;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
        this.isFired = isFired;
        this.isDeleted = isDeleted;
    }

    get fullName() {
        return `${this.lastName} ${this.firstName.charAt(0)}. ${this.secondName.charAt(0)}.`
    }

    static of(employee) {
        return new Employee(
            employee.id,
            employee.lastName,
            employee.firstName,
            employee.secondName,
            employee.birthdayYear,
            employee.phoneNumber,
            employee.userId,
            !!employee.isFired,
            !!employee.isDeleted
        );
    }
}
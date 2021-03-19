import { DataItem, Employee } from "../models"
import Colors from "../constants/colors"
import IconsUri from "../constants/icons"

export const COMPANY_DATA = {
    storage: [
        new DataItem('cdata1', 'Количество поддонов "ХОЙНИКИ"', 120,
            IconsUri.pallet, Colors.primary),
        new DataItem('cdata2', 'Количество поддонов "СОЛЬЗАВОД"', 120,
            IconsUri.pallet, Colors.primary),
        new DataItem('cdata3', 'Количество поддонов "НПЗ"', 120,
            IconsUri.pallet, Colors.primary),
        new DataItem('cdata4', 'Количество поддонов "БМЗ"', 120,
            IconsUri.pallet, Colors.primary),

    ],
    countEmployee: new DataItem('countEmployee', 'Количество сотрудников', 20,
        IconsUri.employees, Colors.orange),
    income: new DataItem('income', 'Доход', '5000$',
        IconsUri.dollar, Colors.green),
    avgSalary: new DataItem('avgSalary', 'Средняя зарплата', '500р',
        IconsUri.employeeSalary, Colors.turquoise)
}

export const EMPLOYEES = [
    new Employee('e1', 'Трофимов', 'Владимир', 'Степанович',
        1971, '+375 (29) 817-47-53' , null),
    new Employee('e2', 'Солодков', 'Михаил', 'Анатольевич',
        1999, '+375 (29) 817-47-53',null),
    new Employee('e3', 'Семёнов', 'Данил', 'Сергеевич',
        2002, '+375 (29) 817-47-53',null),
    new Employee('e4', 'Липский', 'Данил', 'Юрьевич',
        2000, '+375 (29) 817-47-53',null),
    new Employee('e5', 'Пискун', 'Егор', 'Александрович',
        1998,'+375 (29) 817-47-53', null)
]
import { DataItem } from "../models"
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
import { DataItem, Employee, Position, Report, WorkItem, DayStat } from "../models"
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

export const POSITIONS = [
    new Position('pos1', 'Поддоны "ХОЙНИКИ"', 0.6, 'р/шт', true, true),
    new Position('pos2', 'Поддоны "СОЛЬЗАВОД"', 0.6, 'р/шт', true, true),
    new Position('pos3', 'Поддоны "НПЗ"', 0.6, 'р/шт', true, true),
    new Position('pos4', 'Поддоны "БМЗ"', 0.6, 'р/шт', true, true),
    new Position('pos5', 'Подсобный рабочий', 2.5, 'р/час', false, false),
    new Position('pos6', 'Рабочий (стандартный тариф)', 3, 'р/час', false, false),
    new Position('pos7', 'Пилорамщик (подсобник)', 5, 'р/куб.м', false, false),
    new Position('pos8', 'Пилорамщик', 8, 'р/куб.м', false, false),
]

export const REPORTS = [
    new Report('r1', new Date(2021, 2, 19), [
        new WorkItem('wr11', EMPLOYEES[0], POSITIONS[0], 100, 60),
        new WorkItem('wr12', EMPLOYEES[1], POSITIONS[0], 100, 60),
        new WorkItem('wr13', EMPLOYEES[2], POSITIONS[4], 8, 20),
        new WorkItem('wr13', EMPLOYEES[3], POSITIONS[4], 8, 20),
        new WorkItem('wr14', EMPLOYEES[4], POSITIONS[1], 120, 72),
    ], [
        new DayStat('stat11', POSITIONS[0], 200, 120),
        new DayStat('stat12', POSITIONS[4], 16, 40),
        new DayStat('stat13', POSITIONS[1], 120, 72)
    ], 160),
    new Report('r2', new Date(2021, 2, 18), [
        new WorkItem('wr21', EMPLOYEES[3], POSITIONS[0], 110, 66),
        new WorkItem('wr22', EMPLOYEES[2], POSITIONS[0], 100, 60),
        new WorkItem('wr23', EMPLOYEES[1], POSITIONS[4], 8, 20),
        new WorkItem('wr23', EMPLOYEES[0], POSITIONS[4], 8, 20),
        new WorkItem('wr14', EMPLOYEES[4], POSITIONS[2], 100, 60),
    ], [
        new DayStat('stat21', POSITIONS[0], 200, 126),
        new DayStat('stat22', POSITIONS[4], 16, 40),
        new DayStat('stat23', POSITIONS[2], 100, 60)
    ], 166),
]
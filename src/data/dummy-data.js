import {Employee, PositionItem, ReportItem, Work} from "../models";

export const fullReportItem = {
    id: 'some-id',
    items: [
        new ReportItem(
            'repItem1',
            new Employee(
                'emp1',
                'Евгений',
                'Владимирович',
                'Трофимов',
                2000
            ),
            [
                new Work(
                    'work1',
                    new PositionItem(
                        'posItem1',
                        'Поддоны "ХОЙНИКИ"',
                        0.6,
                        'р/шт',
                        true
                    ),
                    '',
                    60,
                    36
                ),
                new Work(
                    'work2',
                    new PositionItem(
                        'posItem2',
                        'Поддоны "СОЛЬЗАВОД"',
                        0.6,
                        'р/шт',
                        true
                    ),
                    '',
                    60,
                    36
                )
            ]
        )
    ]
}

export const workResults = {
    currentPositions: [
        {
            position: {
                id: 'position1',
                name: 'Поддоны "ХОЙНИКИ"'
            },
            result: 60
        },
        {
            position: {
                id: 'position2',
                name: 'Поддоны "СОЛЬЗАВОД"'
            },
            result: 60
        },
        {
            position: {
                id: 'position3',
                name: 'Поддоны "НПЗ"'
            },
            result: 0
        },
        {
            position: {
                id: 'position4',
                name: 'Поддоны "БМЗ"'
            },
            result: 0
        }
    ],
    fine: 0, // штраф
    income: 72,
    consumption: 0 // расход
}
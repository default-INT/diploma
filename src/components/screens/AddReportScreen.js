import React from "react";
import PropTypes from "prop-types";

import {AddReportFragment, ContentTitle, FragmentList, MainContent, Widget, WidgetList} from "../index";
import Colors  from '../../constants/colors'
import {palletIcon} from "../../icons";

const testData = {
    id: 'some-id',
    items: [
        {
            employee: {
                id: '1',
                firstName: 'Евгений',
                secondName: 'Владимирович',
                lastName: 'Трофимов',
                birthdayYear: 2020
            },
            works: [
                {
                    position: {
                        id: '1',
                        name: 'Поддоны "ХОЙНИКИ"',
                        itemTariff: 0.6,
                        itemName: 'р/шт',
                        current: true
                    },
                    comment: '',
                    itemCount: 60,
                    sum: 36
                },
                {
                    position: {
                        id: '2',
                        name: 'Поддоны "СОЛЬЗАВОД"',
                        itemTariff: 0.6,
                        itemName: 'р/шт',
                        current: true
                    },
                    comment: '',
                    itemCount: 60,
                    sum: 36
                }
            ]
        }
    ]
}

const workResults = {
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

const colors = [
    Colors.primary,
    Colors.orange,
    Colors.turquoise,
    Colors.green,
    Colors.red
]

const dateFormatter = date => {
    const day = (date.getDate() < 9 ? '0' : '') + date.getDate()
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
    return (
        `${day}.${month}.${date.getFullYear()}`
    )
}

class AddReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: testData,
            workResults: workResults
        }
    }

    render() {
        const {date} = this.props.location.state
        return (
            <MainContent>
                <ContentTitle>Отчёт за {dateFormatter(date.fullDate)}</ContentTitle>
                <WidgetList>
                    {this.state.workResults.currentPositions.map((work, index) => (
                        <Widget key={work.position.id} title={work.position.name} value={work.result}
                                color={colors[index]} icon={palletIcon}/>
                    ))}
                </WidgetList>
                <FragmentList>
                    <AddReportFragment report={this.state.report}/>
                </FragmentList>
            </MainContent>
        );
    }
}

AddReportScreen.propTypes = {
    report: PropTypes.object
}

export default AddReportScreen;
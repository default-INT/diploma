import React from "react";
import PropTypes from "prop-types";

import {AddReportFragment, ContentTitle, FragmentList, MainContent, Widget, WidgetList} from "../index";
import Colors  from '../../constants/colors'
import {palletIcon} from "../../icons";
import { fullReportItem, workResults} from "../../data/dummy-data"



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
            report: fullReportItem,
            workResults: workResults
        }
    }

    changeReportItems = newReport => {

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
                    <AddReportFragment changeReportItems report={this.state.report}/>
                </FragmentList>
            </MainContent>
        );
    }
}

AddReportScreen.propTypes = {
    report: PropTypes.object
}

export default AddReportScreen;
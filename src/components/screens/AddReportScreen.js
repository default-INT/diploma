import React from "react";
import PropTypes from "prop-types";
import {ContentTitle, MainContent, Widget, WidgetList} from "../index";
import {palletIcon} from "../../icons";

class AddReportScreen extends React.PureComponent {
    render() {
        const {date = '2020-12-05'} = this.props
        return (
            <MainContent>
                <ContentTitle>Отчёт за {date}</ContentTitle>
                <WidgetList>
                    <Widget title='КОЛИЧЕСТВО ПОДДОНОВ "ХОЙНИКИ"' value='210' color='#f7c33c' icon={palletIcon} />
                    <Widget title='КОЛИЧЕСТВО ПОДДОНОВ "СОЛЬЗАВОД"' value='210' color='#1cc98a' icon={palletIcon} />
                    <Widget title='КОЛИЧЕСТВО ПОДДОНОВ "НПЗ"' value='210' color='#36b9cd' icon={palletIcon} />
                    <Widget title='КОЛИЧЕСТВО ПОДДОНОВ "БМЗ"' value='210' color='#5072e0' icon={palletIcon} />
                </WidgetList>
            </MainContent>
        )
    }
}

AddReportScreen.propTypes = {
    report: PropTypes.object
}

export default AddReportScreen;
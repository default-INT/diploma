import React from "react";

import {ContentTitle, MainContent} from "../../utils";
import {FragmentList, SimpleFragment} from "../../fragments";
import OldReportCalendar from "../../calendar/ReportCalendar";
import {ReportCalendar} from "./components";

const ReportScreenView = props => {
    const {monthlyReports, isLoaded, error} = props;
    return (
        <MainContent>
            <ContentTitle>Отчёты</ContentTitle>
            <FragmentList>
                <SimpleFragment title='Календарь'>
                    <OldReportCalendar/>
                </SimpleFragment>
            </FragmentList>
            <ContentTitle>Отчёты</ContentTitle>
            <FragmentList>
                <SimpleFragment title='Календарь'>
                    <ReportCalendar/>
                </SimpleFragment>
            </FragmentList>
        </MainContent>
    )
};

export default ReportScreenView;
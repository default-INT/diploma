import React from "react";

import ReportCalendar from "../calendar/ReportCalendar";
import {ContentTitle, MainContent, SimpleFragment} from "../index";
import {FragmentList} from "../fragments";

const ReportScreen = () => {
    return (
        <MainContent>
            <ContentTitle>Отчёты</ContentTitle>
            <FragmentList>
                <SimpleFragment title='Календарь'>
                    <ReportCalendar/>
                </SimpleFragment>
            </FragmentList>
        </MainContent>
    )
}

export default ReportScreen
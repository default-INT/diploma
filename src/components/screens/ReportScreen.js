import React from "react";
import {FragmentList, SimpleFragment} from "../fragments";
import ReportCalendar from "../calendar/ReportCalendar";

const ReportScreen = () => {
    return (
        <div className="main-content">
            <div className="content-title">Отчёты</div>
            <FragmentList>
                <SimpleFragment title='Календарь'>
                    <ReportCalendar/>
                </SimpleFragment>
            </FragmentList>
        </div>
    )
}

export default ReportScreen
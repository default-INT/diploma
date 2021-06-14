import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";

import CalendarHeader from "./CalendarHeader";
import DayOfWeekHeader from "./DayOfWeekHeader";
import CalendarBody from "./CalendarBody";
import {useDispatch} from "react-redux";
import {eqDates, getMonthDates} from "../../../../util/date-utils";

const Table = styled.table`
  min-width: 1000px;
  border-spacing: 0;
  border-collapse: collapse;
`;

const ReportCalendar = ({monthlyReports, ...props}) => {

    const {
        loadMonthlyReports,
        isLoaded,
        error
    } = props;
    const currentDate = new Date();
    const [dates, setDates] = useState(getMonthDates(currentDate));

    const [currentMonthYear, setCurrentMonthYear] = useState({
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
    });

     const loadReportsOnMonthYear = useCallback(async () => {
         await loadMonthlyReports(currentMonthYear.month, currentMonthYear.year);
         setDates(prevDates => {
             const newDates = [...prevDates];
             for (let i = 0; i < newDates.length; i++) {
                 for (let j = 0; j < newDates[i].length; j++) {
                     const report = monthlyReports.reports
                         .find(report => eqDates(report.date, newDates[i][j].fullDate));
                     if (report) {
                         newDates[i][j] = {
                             ...newDates[i][j],
                             report
                         }
                     }
                     newDates[i][j].loading = false;
                 }
             }
             return newDates;
         })
     }, [dates, currentDate, monthlyReports]);

    useEffect(() => {
        loadReportsOnMonthYear();
    }, [currentMonthYear]);

    return (
        <Table>
            <CalendarHeader
                currentDate={currentMonthYear}
            />
            <DayOfWeekHeader/>
            <CalendarBody dates={dates}/>
        </Table>
    )
};

export default ReportCalendar;
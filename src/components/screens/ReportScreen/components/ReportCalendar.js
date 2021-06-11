import React, {useState} from "react";
import styled from "styled-components";

import CalendarHeader from "./CalendarHeader";
import DayOfWeekHeader from "./DayOfWeekHeader";
import CalendarBody from "./CalendarBody";
import {useDispatch} from "react-redux";
import {getMonthDates} from "../../../../util/date-utils";

const Table = styled.table`
  min-width: 1000px;
  border-spacing: 0;
  border-collapse: collapse;
`;

const ReportCalendar = props => {
    const currentDate = new Date();
    const [dates, setDates] = useState(getMonthDates(currentDate));
    const dispatch = useDispatch();
    return (
        <Table>
            <CalendarHeader
                currentDate={currentDate}
            />
            <DayOfWeekHeader/>
            <CalendarBody dates={dates}/>
        </Table>
    )
};

export default ReportCalendar;
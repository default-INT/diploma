import React from "react";
import styled from "styled-components";
import DayCell from "./DayCell";


const CalendarBody = props => {
    const {dates} = props;
    return (
        <tbody>
            {dates.map(datesRow => (
                <tr key={JSON.stringify(datesRow)}>
                    {datesRow.map(date => (
                        <DayCell
                            key={date.fullDate.toISOString()}
                            date={date}
                        />))
                    }
                </tr>
            ))}
        </tbody>
    )
};


export default CalendarBody;
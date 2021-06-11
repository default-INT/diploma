import React from "react";
import styled from "styled-components";

import Colors from "../../../../constants/colors";

const DayOfWeekCell = styled.th`
  border-bottom: 2px solid ${Colors.gray};
  border-top: 2px solid ${Colors.gray};
  padding-top: .5rem;
  padding-bottom: .5rem;
`;

const DayOfWeekHeader = props => {
    return (
        <tr>
            <DayOfWeekCell>Понедельник</DayOfWeekCell>
            <DayOfWeekCell>Вторник</DayOfWeekCell>
            <DayOfWeekCell>Среда</DayOfWeekCell>
            <DayOfWeekCell>Четверг</DayOfWeekCell>
            <DayOfWeekCell>Пятница</DayOfWeekCell>
            <DayOfWeekCell>Суббота</DayOfWeekCell>
            <DayOfWeekCell>Воскресенье</DayOfWeekCell>
        </tr>
    )
}

export default DayOfWeekHeader;
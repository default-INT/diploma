import React from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import {MONTHS} from "../../../../types";

const Thead = ({children}) => {
    const InnerCell = styled.td`
        text-align: center;
    `
    return (
        <thead>
            <tr>
                <InnerCell colSpan={7}>
                    {children}
                </InnerCell>
            </tr>
        </thead>
    )
}


const TableWrapper = styled.table`
  white-space: nowrap;
  width: 100%;
  padding: 0.5rem;
`;

const CalendarHeader = ({currentDate, onLeftClick, onRightClick, ...props}) => {
    return (
        <Thead>
            <TableWrapper>
                <tr>
                    <ControlButton left onClick={onLeftClick} />
                    <td>
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </td>
                    <ControlButton right onClick={onRightClick} />
                </tr>
            </TableWrapper>
        </Thead>
    )
};

export default CalendarHeader;
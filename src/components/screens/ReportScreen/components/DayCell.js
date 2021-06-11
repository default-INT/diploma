import React from "react";
import styled from "styled-components";

import Colors from "../../../../constants/colors";
import Tooltip from "../../../Tooltip/Tooltip";
import {eqDates} from "../../../../util/date-utils";
import {doneBlueIcon, questionOrangeIcon, questionRedIcon} from "../../../../icons";

const DayCellWrapper = styled.td`
  vertical-align: top;
  padding: .5rem;
  text-align: right;
  height: 80px;
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  border-bottom: 2px solid ${Colors.gray};
  cursor: pointer;
  transition: .5s ease-in-out;
  position: relative;
  &:hover {
    background-color: whitesmoke;
  }
  &:hover span {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const TouchComponent = styled.a`

`;

const ImgBox = styled.div`
  text-align: center;
`;

const DayCell = ({date, onSelectDate, onEditReport, ...props}) => {
    const dateNow = new Date();

    let iconName;
    let iconColor;
    let tooltipMsg;

    if (date.report) {
        iconName = doneBlueIcon;
        iconColor = Colors.primary;
        tooltipMsg = `Отчёт присутствует`;
    } else if (eqDates(date.fullDate, dateNow)) {
        iconName = questionOrangeIcon;
        iconColor = Colors.orange;
        tooltipMsg = `Добавьте отчёт за сегодняшний день`;
    } else if (date.fullDate < dateNow) {
        iconName = questionRedIcon;
        iconColor = Colors.red;
        const dateDiff = Math.ceil(Math.abs(dateNow.getTime() - date.fullDate.getTime())
            / (1000 * 3600 * 24));
        tooltipMsg = `Вы просрочили отчёт на ${dateDiff - 1} дн.`;
    }
    return (
        <DayCellWrapper>
            <TouchComponent>
                <Tooltip color={iconColor}>
                    {tooltipMsg}
                </Tooltip>
                <div>{date.fullDate.getDate()}</div>
                <ImgBox>
                    <img src={iconName} alt='' width={50}/>
                </ImgBox>
            </TouchComponent>
        </DayCellWrapper>
    )
};

export default DayCell;
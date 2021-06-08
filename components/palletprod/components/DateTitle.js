import React from "react";

import {nameDayOfWeek, toDateFormat} from "../../../utils";
import Colors from "../../../constants/colors";
import TitleContainer from "./TitleContainer";
import TitleText from "./TitleText";

const DateTitle = ({date, dateFormatter = toDateFormat}) => {
    return (
        <TitleContainer>
            <TitleText>{dateFormatter(date)}</TitleText>
            <TitleText style={{
                color: date.getDay() === 6 || date.getDay() === 0 ? Colors.red : Colors.black}}>
                {nameDayOfWeek[date.getDay()].toUpperCase()}
            </TitleText>
        </TitleContainer>
    )
}

export default DateTitle;
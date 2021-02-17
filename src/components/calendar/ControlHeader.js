import React, { useState} from "react";
import {DefaultIconBtn} from "../utils";
import {leftArrowBlackIcon, rightArrowBlackIcon} from "../../icons";
import {MONTHS} from "../../types";

const ControlHeader = ({loadWeek}) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const changeDate = date => {
        setCurrentDate(new Date(date))
        loadWeek(new Date(date))
    }
    return (
        <thead>
        <tr>
            <td colSpan={7} style={({textAlign: "center"})}>
                <table style={({whiteSpace: 'nowrap', width: '100%', padding: '.5rem'})}>
                    <tr className='c-controls'>
                        <td className='c-control-item' style={({float: 'left'})}>
                            <DefaultIconBtn icon={leftArrowBlackIcon}
                                            onClick={() => changeDate((new Date(currentDate)
                                                .setMonth(currentDate.getMonth() - 1)))}/>
                        </td>
                        <td className='c-control-item'>
                            <a className="default-link">
                                {MONTHS[currentDate.getMonth()]}
                            </a>
                            <a className="default-link">
                                {currentDate.getFullYear()}
                            </a>
                        </td>
                        <td className='c-control-item' style={({float: 'right'})}>
                            <DefaultIconBtn icon={rightArrowBlackIcon}
                                            onClick={() => changeDate((new Date(currentDate)
                                                .setMonth(currentDate.getMonth() + 1)))}/>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        </thead>
    )
}

export { ControlHeader }
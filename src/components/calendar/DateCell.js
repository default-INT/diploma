import React from "react";
import {doneBlueIcon, questionOrangeIcon, questionRedIcon} from "../../icons";
import {Link} from "react-router-dom";

const eqDates = (date1, date2) => (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
)

const TooltipMsg = ({children, bgColor}) => (
    <span className="tooltip-text" style={({backgroundColor: bgColor})}>
        {children}
    </span>
)

const TooltipReportMsg = ({ report }) => (
    <TooltipMsg>
        <span className="item">Человек: {report.countEmployees}</span>
        <span className="item">Поддоны: {report.totalPallet}</span>
        <span className="item">Отработанно ч.: {report.totalHours}</span>
    </TooltipMsg>
)

const DateCell = ({date}) => {
    let icon;
    let tooltip;
    const dateNow = new Date()
    if (date.status && date.report) {
        icon = doneBlueIcon
        tooltip = <TooltipReportMsg report={date.report} />
    } else if (eqDates(date.fullDate, dateNow)) {
        icon = questionOrangeIcon
        tooltip = (<TooltipMsg bgColor={'#f7c33c'}>Добавьте отчёт за сегодняшний день</TooltipMsg>)
    } else if (date.fullDate < dateNow) {
        icon = questionRedIcon
        const dateDiff = Math.ceil(Math.abs(dateNow.getTime() - date.fullDate.getTime())
            / (1000 * 3600 * 24));
        tooltip = (
            <TooltipMsg bgColor={'#f00'}>
                Вы просрочили отчёт на {dateDiff} дней
            </TooltipMsg>
        )
    }
    return (
        <td className={`c-day tooltip ${date.disable && 'disable'}`}>
            <Link to='/add-report'>
                {tooltip}
                <div className="date">
                    {date.fullDate.getDate()}
                </div>
                <div className='img-box'>
                    <img src={icon} alt="" width={50}/>
                </div>
            </Link>
        </td>
    )
}

export { DateCell }
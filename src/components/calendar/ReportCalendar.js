import React from "react";
import {ControlHeader} from "./ControlHeader";
import {WeeksHeader} from "./WeeksHeader";
import "../../css/ReportCalendar.css"
import {TableRow} from "./TableRow";

/**
 * Return days for calendar on selected date
 *
 * @param date
 * @returns {[[]]}
 */
const getWeek = (date) => {
    date = date || new Date()
    const firstDateInWeek = new Date(date.getFullYear(), date.getMonth())
    const currentDate = new Date(firstDateInWeek)
    const dates = [[]];
    if (firstDateInWeek.getDay() !== 1) {
        const pastDate = new Date(firstDateInWeek)
        while (pastDate.getDay() !== 1) {
            pastDate.setDate(pastDate.getDate() - 1)
            dates[0].push({
                fullDate: new Date(pastDate),
                disable: true
            })

        }
    }
    dates[0].reverse()
    do {
        dates[0].push({
            fullDate: new Date(currentDate),
            disable: false
        })
        currentDate.setDate(currentDate.getDate() + 1)
    } while (currentDate.getDay() !== 1)
    dates.push([])

    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            dates[i].push({
                fullDate: new Date(currentDate),
                disable: currentDate.getMonth() !== firstDateInWeek.getMonth()
            })
            currentDate.setDate(currentDate.getDate() + 1)
        }
        dates.push([])
    }

    return dates
}

class ReportCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: getWeek()
        }
    }

    componentDidMount() {
        const dates = this.state.dates
        dates[0][0] = {
            ...this.state.dates[0][0],
            report: {
                id: 'some-report-id',
                countEmployees: 20,
                totalPallet: 10,
                totalHours: 4
            },
            status: true
        }

        this.setState(prev => ({
            ...prev,
            dates: dates
        }))
    }

    loadWeek(date) {
        this.setState(prev => ({
            ...prev,
            dates: getWeek(date)
        }))
    }

    render() {

        return (
            <table className='report-calendar'>
                <ControlHeader loadWeek={date => this.loadWeek(date)}/>
                <WeeksHeader />
                <tbody>
                    {this.state.dates.map(datesRow => <TableRow dates={datesRow} />)}
                </tbody>
            </table>
        )
    }
}


export default ReportCalendar
/**
 * Return days for calendar on selected date
 *
 * @param date {Date}
 * @returns {[[]]}
 */
export const getMonthDates = (date) => {
    date = date || new Date();
    const firstDateInWeek = new Date(date.getFullYear(), date.getMonth())
    const currentDate = new Date(firstDateInWeek)
    const dates = [[]];
    if (firstDateInWeek.getDay() !== 1) {
        const pastDate = new Date(firstDateInWeek)
        while (pastDate.getDay() !== 1) {
            pastDate.setDate(pastDate.getDate() - 1)
            dates[0].push({
                fullDate: new Date(pastDate),
                loading: true,
                disable: true
            })

        }
    }
    dates[0].reverse()
    do {
        dates[0].push({
            fullDate: new Date(currentDate),
            loading: true,
            disable: false
        })
        currentDate.setDate(currentDate.getDate() + 1)
    } while (currentDate.getDay() !== 1)
    dates.push([]);
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            dates[i].push({
                fullDate: new Date(currentDate),
                loading: true,
                disable: currentDate.getMonth() !== firstDateInWeek.getMonth()
            })
            currentDate.setDate(currentDate.getDate() + 1)
        }
        dates.push([])
    }

    return dates
}

export const eqDates = (date1, date2) => (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
)

export const toDateFormat = date => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const toDateTimeFormat = date => {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${day}.${month}.${year} ${hour}:${minutes}`;
}

export const nameDayOfWeek = {
    0: 'вс',
    1: 'пн',
    2: 'вт',
    3: 'ср',
    4: 'чт',
    5: 'пт',
    6: 'сб'
}

export const setDateTimeCurrentTimeZone = date => {
    const currentDateTime = new Date(date);
    const offset = currentDateTime.getTimezoneOffset();
    currentDateTime.setMinutes(currentDateTime.getMinutes() - offset);
    return currentDateTime;
}
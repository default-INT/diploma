import React from "react";

const WeeksHeader = () => {
    return (
        <thead>
        <tr className="c-weeks">
            <th className="c-name">
                Понедельник
            </th>
            <th className="c-name">
                Вторник
            </th>
            <th className="c-name">
                Среда
            </th>
            <th className="c-name">
                Четверг
            </th>
            <th className="c-name">
                Пятница
            </th>
            <th className="c-name">
                Суббота
            </th>
            <th className="c-name">
                Воскресенье
            </th>
        </tr>
        </thead>
    )
}

export { WeeksHeader }
import React from "react";
import {DateCell} from "./DateCell";

const TableRow = ({dates}) => {
    return (
        <tr className='c-days-row'>
            {dates.map(date => <DateCell date={date} />)}
        </tr>
    )
}

export { TableRow }
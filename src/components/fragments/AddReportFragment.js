import React from "react"

import {ControlFragment} from "./index";
import {ReportItem} from "./report/ReportItem";


const AddReportFragment = ({report, children, ...props}) => {
    console.log(report)
    return (
        <ControlFragment title='Отчёт' onClick={() => ''} style={{width: '100%'}}>
            {report.items.map(item => (
                <ReportItem reportItem={item} onEditItem={() => {}} />
            ))}
        </ControlFragment>
    )
}

AddReportFragment.prototype = ControlFragment

export default AddReportFragment

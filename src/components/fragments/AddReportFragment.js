import React, { useState } from "react"
import {ControlFragment} from "./index";



const AddReportFragment = ({report, children, ...props}) => {
    console.log(report)
    return (
        <ControlFragment title='Отчёт' onClick={() => ''} style={{width: '100%'}}>

        </ControlFragment>
    )
}

AddReportFragment.prototype = ControlFragment

export default AddReportFragment

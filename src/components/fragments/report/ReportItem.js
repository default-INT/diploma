import React from "react"
import PropTypes from "prop-types";

import "./ReportItem.scss"
import { builderIcon, editIcon, addIcon } from "../../../icons"
import {DefaultIconBtn} from "../../index";

const getEmployeeFullName = employee => (
    `${employee.lastName} ${employee.firstName.charAt(0)}.${employee.secondName.charAt(0)}.`
)

const WorkItem = ({work}) => {

    return (
        <div className="work">
            {work.positionItem.name}
        </div>
    )
}

const ReportItem = ({reportItem, onEditItem}) => {
    return (
        <div className="report-item">
            <div className="employee-info">
                <div className="img-container">
                    <img src={builderIcon} alt=""/>
                </div>
                <div className="info">
                    <div className="emp-title">
                        <div>{getEmployeeFullName(reportItem.employee)}</div>
                        <DefaultIconBtn icon={editIcon} width={25} />
                    </div>
                    <div className="info-content">
                        <div className="line">
                            Год рождения: {reportItem.employee.birthdayYear}
                        </div>
                    </div>
                </div>
            </div>
            <div className="work-items">
                <div className="wi-title">
                    <div>Работа за день</div>
                    <DefaultIconBtn icon={addIcon} width={25} />
                </div>
                <div className="works">
                    {reportItem.works.map(work => (
                        <WorkItem work={work}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

ReportItem.propTypes = {
    reportItem: PropTypes.object,
    onEditItem: PropTypes.func
}

export { ReportItem }
import { combineReducers } from "redux";

import {storageReducer} from "./strorageReducer";
import {companyReducer} from "./companyReducer";
import {employeeReducer} from "./employeeReducer";
import {positionReducer} from "./positionReducer";
import {reportReducer} from "./reportReducer";
import {statisticReducer} from "./statisticReducer";

const rootReducer = combineReducers({
    storage: storageReducer,
    company: companyReducer,
    employees: employeeReducer,
    positions: positionReducer,
    reports: reportReducer,
    statistics: statisticReducer
})

export default rootReducer
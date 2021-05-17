import { combineReducers } from "redux";

import {storageReducer} from "./strorageReducer";
import {companyReducer} from "./companyReducer";
import {employeeReducer} from "./employeeReducer";
import {positionReducer} from "./positionReducer";
import {reportReducer} from "./reportReducer";
import {statisticReducer} from "./statisticReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    storage: storageReducer,
    company: companyReducer,
    employees: employeeReducer,
    positions: positionReducer,
    reports: reportReducer,
    statistics: statisticReducer,
    auth: authReducer
})

export default rootReducer
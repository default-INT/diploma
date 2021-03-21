import { combineReducers } from "redux";

import {storageReducer} from "./strorageReducer";
import {companyReducer} from "./companyReducer";
import {employeeReducer} from "./employeeReducer";
import {positionReducer} from "./positionReducer";
import {reportReducer} from "./reportReducer";

const rootReducer = combineReducers({
    storage: storageReducer,
    company: companyReducer,
    employees: employeeReducer,
    positions: positionReducer,
    reports: reportReducer
})

export default rootReducer
import { combineReducers } from "redux"

import {storageReducer} from "./strorageReducer";
import {companyReducer} from "./companyReducer"
import {employeeReducer} from "./employeeReducer"

const rootReducer = combineReducers({
    storage: storageReducer,
    company: companyReducer,
    employees: employeeReducer
})

export default rootReducer
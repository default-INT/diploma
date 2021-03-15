import { combineReducers } from "redux"

import {storageReducer} from "./strorageReducer";
import {companyReducer} from "./companyReducer"

const rootReducer = combineReducers({
    storage: storageReducer,
    company: companyReducer
})

export default rootReducer
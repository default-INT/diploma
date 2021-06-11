import { reducer as formReducer } from 'redux-form';

import { combineReducers } from 'redux';
import { positionReducer } from "./positionReducer";
import { appReducer } from "./appReducer";
import { employeeReducer } from "./employeeReducer";
import { authReducer } from "./authReducer";
import {companyReducer} from "./companyReducer";
import {storageReducer} from "./storageReducer";
import {reportReducer} from "./reportReducer";


const rootReducer = combineReducers({
    positions: positionReducer,
    app: appReducer,
    employees: employeeReducer,
    auth: authReducer,
    company: companyReducer,
    storage: storageReducer,
    reports: reportReducer,
    form: formReducer
})

export default rootReducer
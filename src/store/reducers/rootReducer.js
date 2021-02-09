import { combineReducers } from 'redux';
import { positionReducer } from "./positionReducer";
import { appReducer } from "./appReducer";
import {employeeReducer} from "./employeeReducer";

const rootReducer = combineReducers({
    positions: positionReducer,
    app: appReducer,
    employees: employeeReducer
})

export default rootReducer
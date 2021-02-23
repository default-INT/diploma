import { combineReducers } from 'redux';
import { positionReducer } from "./positionReducer";
import { appReducer } from "./appReducer";
import { employeeReducer } from "./employeeReducer";
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
    positions: positionReducer,
    app: appReducer,
    employees: employeeReducer,
    form: formReducer
})

export default rootReducer
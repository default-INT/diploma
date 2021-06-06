import { reducer as formReducer } from 'redux-form';

import { combineReducers } from 'redux';
import { positionReducer } from "./positionReducer";
import { appReducer } from "./appReducer";
import { employeeReducer } from "./employeeReducer";
import { authReducer } from "./authReducer";


const rootReducer = combineReducers({
    positions: positionReducer,
    app: appReducer,
    employees: employeeReducer,
    auth: authReducer,
    form: formReducer
})

export default rootReducer
import { combineReducers } from 'redux';
import { positionReducer } from "./positionReducer";
import { appReducer } from "./appReducer";

const rootReducer = combineReducers({
    positions: positionReducer,
    app: appReducer
})

export default rootReducer
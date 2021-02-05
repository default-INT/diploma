import { combineReducers } from 'redux';
import positionReducer from "./positionReducer";

const rootReducer = combineReducers({
    positions: positionReducer,
    app: null
})

export default rootReducer
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = window.__REDUX_DEVTOOLS_EXTENSION__ ?
    createStore(rootReducer, compose(
        applyMiddleware(
            thunk
        ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) : createStore(rootReducer, compose(
        applyMiddleware(
            thunk
        )
    ))

export default store
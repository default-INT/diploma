import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers/rootReducer";
import {rootSaga} from "./sagas";


const sagaMiddleware = createSagaMiddleware();


const index = window.__REDUX_DEVTOOLS_EXTENSION__ ?
    createStore(rootReducer, compose(
        applyMiddleware(
            thunk, sagaMiddleware
        ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) : createStore(rootReducer, compose(
        applyMiddleware(
            thunk, sagaMiddleware
        )
));

sagaMiddleware.run(rootSaga);

export default index;
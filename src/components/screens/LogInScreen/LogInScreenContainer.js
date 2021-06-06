import React, {useState, useCallback, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {authActions} from "../../../store/action-creators";
import LogInScreenView from "./LogInScreenView";


const LogInScreenContainer = props => {
    
    const {loading, error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitHandler = useCallback( () => {
        dispatch(authActions.logIn(email, password))
    }, [dispatch, email, password]);

    const inputHandler = (setValue, value) => {
        setValue(value);
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(authActions.setError(null));
        }
    }, [error]);
    
    return (
        <LogInScreenView
            emailHandler={inputHandler.bind(this, setEmail)}
            passwordHandler={inputHandler.bind(this, setPassword)}
            email={email}
            password={password}
            loading={loading}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default LogInScreenContainer;
import React, {useEffect} from "react";

import MainScreenView from "./MainScreenView";
import {companyActions} from "../../../store/action-creators";
import {useDispatch, useSelector} from "react-redux";

const MainScreenContainer = props => {
    const {loading, error, countEmployee, avgSalary} = useSelector(state => state.company);
    const dispatch = useDispatch();
    console.log(props)
    useEffect(() => {
        dispatch(companyActions)
    }, []);

    return (
        <MainScreenView
            countEmployee={countEmployee}
            avgSalary={avgSalary}
            loading={loading}
            error={error}
        />
    )
};

export default MainScreenContainer;
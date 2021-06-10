import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import MainScreenView from "./MainScreenView";
import {companyActions} from "../../../store/action-creators";
import {storageActions} from "../../../store/actions";

const MainScreenContainer = props => {
    const {isLoaded:isLoadedCompanyData, error, countEmployee, avgSalary} = useSelector(state => state.company);
    const {actualStorage, isLoadedStorage} = useSelector(state => state.storage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(companyActions.fetchCompanyData());
        dispatch(storageActions.fetchActualStorage());

    }, [dispatch]);

    return (
        <MainScreenView
            countEmployee={countEmployee}
            avgSalary={avgSalary}
            isLoadedCompanyData={isLoadedCompanyData}
            error={error}

            actualStorage={actualStorage}
            isLoadedStorage={isLoadedStorage}
        />
    )
};

export default MainScreenContainer;
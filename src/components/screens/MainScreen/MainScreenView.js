import React from 'react'

import {ContentTitle, CubeLoader, MainContent, Widget, WidgetList} from "../../index";
import {dollarIcon, employeeIcon, palletIcon, salaryIcon} from "../../../icons";
import '../../../css/MainContent.css'
import {DataWidget} from "../../widgets";

const MainScreenView = props => {
    const {
        avgSalary,
        isLoadedCompanyData,
        countEmployee,
        error,

        actualStorage,
        isLoadedStorage
    } = props;

    if (error) {
        return (
            <MainContent>
                <CubeLoader />
            </MainContent>
        )
    }

    return (
        <MainContent>
            <ContentTitle>Главное</ContentTitle>
            <WidgetList>
                {isLoadedCompanyData ? (
                    <>
                        <DataWidget dataItem={avgSalary}/>
                        <DataWidget dataItem={countEmployee}/>
                    </>
                ) : <CubeLoader/>}

            </WidgetList>
            <ContentTitle>Склад</ContentTitle>
            <WidgetList>
                {isLoadedStorage ? (
                    actualStorage.map(storage => (
                        <DataWidget dataItem={storage} key={storage.id} />
                    ))
                ) : (
                    <CubeLoader/>
                )}
            </WidgetList>
            {/*<FragmentList>*/}
            {/*    <SimpleFragment title="Fragment">Content</SimpleFragment>*/}
            {/*</FragmentList>*/}
        </MainContent>
    )
}

export default MainScreenView
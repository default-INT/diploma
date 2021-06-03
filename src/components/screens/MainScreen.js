import React from 'react'

import {SimpleFragment, Widget, FragmentList, WidgetList, MainContent, ContentTitle} from "../index";
import {salaryIcon, employeeIcon, palletIcon, dollarIcon} from "../../icons";
import '../../css/MainContent.css'

const MainScreen = () => {
    return (
        <MainContent>
            <ContentTitle>Главное</ContentTitle>
            <WidgetList>
                <Widget title='КОЛИЧЕСТВО ВЫГРУЗОК ЗА МЕСЯЦ' value='8' color='#1cc98a' icon={dollarIcon} />
                <Widget title='КОЛИЧЕСТВО СОТРУДНИКОВ' value='13' color='#36b9cd' icon={employeeIcon} />
                <Widget title='ПОДДОНЫ "ОСИПОВИЧИ"' value='2520' color='#f7c33c' icon={palletIcon} />
                <Widget title='СРЕДНЯЯ ЗАРПЛАТА ЗА ДЕНЬ' value='24.7р' color='#5072e0' icon={salaryIcon} />
            </WidgetList>
            {/*<FragmentList>*/}
            {/*    <SimpleFragment title="Fragment">Content</SimpleFragment>*/}
            {/*</FragmentList>*/}
        </MainContent>
    )
}

export default MainScreen
import {Widget} from "../widgets/Widget";
import positionIcon from "../../icon/nav/suitcase.svg";
import popularIcon from "../../icon/popularity.svg";
import dollarIcon from "../../icon/dollar.svg";
import addIcon from "../../icon/add.svg";
import {SimpleFragment} from "../fragments/SimpleFragment";
import React, {Fragment, useState} from "react";
import EditableTable from "../EditableTable";
import ModalWindow from "../ModalWindow";


const FragmentHead = (
    <Fragment>
        <div>Тарифы</div>
        <a className='default-icon-btn'>
            <img src={addIcon} width={30} alt=""/>
        </a>
    </Fragment>
)

const PositionScreen = () => {
    const [modalOpen, onModalOpen] = useState(true)
    const header = ['Название тарифа', 'Заработок', 'Исчисление']
    const data = [
        {id: '4354gd3', name: 'Поддоны "СОЛЬЗАВОД"', itemTariff: 0.6, itemName: 'р/шт'},
        {id: '0546cvz', name: 'Поддоны "ХОЙНИКИ"', itemTariff: 0.6, itemName: 'р/шт'}
    ]
    return (
        <div className="main-content">
            {modalOpen ? <ModalWindow onModalState={onModalOpen}/> : null}
            <div className="content-title">Positions</div>
            <div className="widget-list">
                <Widget title='КОЛИЧЕСТВО ПОЗИЦИЙ' value='5' color='#36b9cd' icon={positionIcon} />
                <Widget title='ПОПУЛЯРНАЯ ПОЗИЦИЯ' value='СБОЙЩИК "СОЛЬЗАВОД"' color='#f7c33c' icon={popularIcon} />
                <Widget title='НАИБОЛЕЕ ПРИБЫЛЬНАЯ' value='СБОЙЩИК "ХОЙНИКИ"' color='#1cc98a' icon={dollarIcon} />
            </div>
            <div className="fragment-list">
                <SimpleFragment title={FragmentHead} style={{width: '100%'}}>
                    <EditableTable header={header} data={data} />
                </SimpleFragment>
            </div>
        </div>
    )
}

export default PositionScreen
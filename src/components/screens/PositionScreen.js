import {Widget} from "../widgets/Widget";
import positionIcon from "../../icon/nav/suitcase.svg";
import popularIcon from "../../icon/popularity.svg";
import dollarIcon from "../../icon/dollar.svg";
import addIcon from "../../icon/add.svg";
import {SimpleFragment} from "../fragments/SimpleFragment";
import React, {Fragment, useState} from "react";
import EditableTable from "../EditableTable";
import {PositionModal} from "../modals/PositionModal";
import ConfirmModalWindow from "../modals/ConfirmModalWindow";
import {connect} from "react-redux";
import {createPosition, deletePosition, fetchPositions, updatePosition} from "../../store/actions/positionActions";



const PositionScreen = ({positions, createPosition, updatePosition, deletePosition, fetchPositions}) => {
    const [modalOpen, onModalOpen] = useState(false)

    const AddPositionModal = <PositionModal onModalState={onModalOpen} action={() => ''}/>
    const EditPositionModal = ({position}) => (
        <PositionModal
            title='Редактирование тарифа'
            onModalState={onModalOpen}
            position={position}
            action={() => ''}
        />
    )

    const DelConfirmModalWindow = (
        <ConfirmModalWindow
            title={'Вы уверены что хотите удалить тариф?'}
            onModalState={onModalOpen}
            actionName={'Удалить'}
        />
    )

    const [positionModal, setPositionModal] = useState(AddPositionModal)

    const openDeleteModal = (id) => {
        setPositionModal(DelConfirmModalWindow)
        onModalOpen(true)
    }

    const openEditModal = (position) => {
        setPositionModal(<EditPositionModal position={position} />)
        onModalOpen(true)
    }

    const openAddModal = () => {
        setPositionModal(AddPositionModal)
        onModalOpen(true)
    }

    const header = ['Название тарифа', 'Заработок', 'Исчисление']
    const data = [
        {id: '4354gd3', name: 'Поддоны "СОЛЬЗАВОД"', itemTariff: 0.6, itemName: 'р/шт'},
        {id: '0546cvz', name: 'Поддоны "ХОЙНИКИ"', itemTariff: 0.6, itemName: 'р/шт'}
    ]
    const Title = (
        <Fragment>
            <div>Тарифы</div>
            <a className='default-icon-btn' onClick={() => openAddModal()}>
                <img src={addIcon} width={30} alt=""/>
            </a>
        </Fragment>
    )

    return (
        <div className="main-content">
            {modalOpen ? positionModal : null}
            <div className="content-title">Positions</div>
            <div className="widget-list">
                <Widget title='КОЛИЧЕСТВО ПОЗИЦИЙ' value='5' color='#36b9cd' icon={positionIcon} />
                <Widget title='ПОПУЛЯРНАЯ ПОЗИЦИЯ' value='СБОЙЩИК "СОЛЬЗАВОД"' color='#f7c33c' icon={popularIcon} />
                <Widget title='НАИБОЛЕЕ ПРИБЫЛЬНАЯ' value='СБОЙЩИК "ХОЙНИКИ"' color='#1cc98a' icon={dollarIcon} />
            </div>
            <div className="fragment-list">
                <SimpleFragment title={Title} style={{width: '100%'}}>
                    <EditableTable
                        header={header}
                        data={data}
                        onEditItem={position => openEditModal(position)}
                        onDeleteItem={id => openDeleteModal(id)}
                        ItemModalWindow={PositionModal}
                    />
                </SimpleFragment>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    positions: state.positions.positions
})

const mapDispatchToProps  = {
    createPosition, updatePosition, deletePosition, fetchPositions
}


export default connect(mapStateToProps, mapDispatchToProps)(PositionScreen)
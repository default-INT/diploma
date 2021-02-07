import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {Widget} from "../widgets/Widget";
import positionIcon from "../../icon/nav/suitcase.svg";
import popularIcon from "../../icon/popularity.svg";
import dollarIcon from "../../icon/dollar.svg";
import addIcon from "../../icon/add.svg";
import {SimpleFragment} from "../fragments/SimpleFragment";
import EditableTable from "../EditableTable";
import {PositionModal} from "../modals/PositionModal";
import ConfirmModalWindow from "../modals/ConfirmModalWindow";
import {createPosition, deletePosition, fetchPositions, updatePosition} from "../../store/actions/positionActions";
import CubeLoader from "../utils/CubeLoader";


const PositionScreen = ({positions, loading, createPosition, updatePosition, deletePosition, fetchPositions}) => {
    const [modalOpen, onModalOpen] = useState(false)
    useEffect(() => {
        fetchPositions()
    }, [])

    const EditPositionModal = ({position, onModalOpen, action}) => (
        <PositionModal
            title='Редактирование тарифа'
            onModalState={onModalOpen}
            position={position}
            action={position => updatePosition(position)}
        />
    )

    const DelConfirmModalWindow = ({position, onModalOpen}) => (
        <ConfirmModalWindow
            title={'Вы уверены что хотите удалить тариф?'}
            onModalState={onModalOpen}
            actionName={'Удалить'}
            action={() => deletePosition(position)}
        />
    )

    const AddPositionModal = ({onModalOpen}) => (
        <PositionModal
            onModalState={onModalOpen}
            action={position => createPosition(position)}
        />
    )

    const [positionModal, setPositionModal] = useState(<AddPositionModal onModalOpen={onModalOpen} />)

    const openDeleteModal = position => {
        setPositionModal(<DelConfirmModalWindow position={position} onModalOpen={onModalOpen}/>)
        onModalOpen(true)
    }

    const openEditModal = (position) => {
        setPositionModal(<EditPositionModal position={position}  onModalOpen={onModalOpen} />)
        onModalOpen(true)
    }

    const openAddModal = () => {
        setPositionModal(<AddPositionModal onModalOpen={onModalOpen} />)
        onModalOpen(true)
    }

    const header = ['Название тарифа', 'Заработок', 'Исчисление']
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
                    {loading ? <CubeLoader/> : <EditableTable
                        header={header}
                        data={positions}
                        onEditItem={position => openEditModal(position)}
                        onDeleteItem={position => openDeleteModal(position)}
                        ItemModalWindow={PositionModal}
                    />}
                </SimpleFragment>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    positions: state.positions.positions,
    loading: state.app.loading
})

const mapDispatchToProps  = {
    createPosition, updatePosition, deletePosition, fetchPositions
}


export default connect(mapStateToProps, mapDispatchToProps)(PositionScreen)
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {createPosition, deletePosition, fetchPositions, updatePosition} from "../../store/actions/actions";
import { navSuitcaseIcon, popularityIcon, dollarIcon } from "../../icons"
import {
    ConfirmModalWindow,
    ControlFragment,
    CubeLoader, EditableTable,
    FragmentList,
    PositionModal,
    Widget,
    WidgetList
} from "../components";


//TODO: wrapped to class component
const PositionScreen = ({positions, loading, createPosition, updatePosition,
                            deletePosition, fetchPositions}) => {

    const [modalOpen, onModalOpen] = useState(false)
    useEffect(() => {
        fetchPositions()
    }, [])

    const EditPositionModal = ({position, onModalOpen}) => (
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

    return (
        <div className="main-content">
            {modalOpen ? positionModal : null}
            <div className="content-title">Должности сотрудников</div>
            <WidgetList>
                <Widget title='КОЛИЧЕСТВО ПОЗИЦИЙ' value='5' color='#36b9cd' icon={navSuitcaseIcon} />
                <Widget title='ПОПУЛЯРНАЯ ПОЗИЦИЯ' value='СБОЙЩИК "СОЛЬЗАВОД"' color='#f7c33c' icon={popularityIcon} />
                <Widget title='НАИБОЛЕЕ ПРИБЫЛЬНАЯ' value='СБОЙЩИК "ХОЙНИКИ"' color='#1cc98a' icon={dollarIcon} />
            </WidgetList>
            <FragmentList>
                <ControlFragment title={'Тарифы'}
                                 style={{width: '100%'}}
                                 onClick={() => openAddModal()}
                >
                    {loading ? <CubeLoader/> : <EditableTable
                        header={header}
                        data={positions}
                        onEditItem={position => openEditModal(position)}
                        onDeleteItem={position => openDeleteModal(position)}
                    />}
                </ControlFragment>
            </FragmentList>
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
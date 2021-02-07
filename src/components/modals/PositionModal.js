import React, {useState} from 'react'
import ModalWindow from "./ModalWindow";
import PropTypes from "prop-types";
import {validNumber, validPositionName, validPositionItemName} from "../../validators";


const PositionModal = ({position, action, title = 'Добавление нового тарифа', onModalState}) => {
    position || (
        position = {
            name: '',
            itemTariff: '',
            itemName: ''
        }
    )

    const [name, setName] = useState(position.name)
    const [itemTariff, setItemTariff] = useState(position.itemTariff)
    const [itemName, setItemName] = useState(position.itemName)
    const [msg, setMsg] = useState('')

    const actionOnClick = () => {
        try {
            if (!validNumber(itemTariff) && !validPositionItemName(itemName) && !validPositionName(name)) {
                throw new Error('некорректные данные')
            }
            action({id: position.id, name, itemTariff, itemName})
            onModalState(false)
        } catch (e) {
            setMsg('Ошиибка: ' + e)
        }
    }

    //TODO: Validator for form
    return (
        <ModalWindow title={title} onModalState={onModalState}>
            <form className='modal-form'>
                <input type="text" placeholder='Название тарифа' onChange={event => setName(event.target.value)}
                       value={name} />
                <input type="text" placeholder='Заработок за ед.' onChange={event => setItemTariff(event.target.value)}
                       value={itemTariff} />
                <input type="text" placeholder='Система исчисления' onChange={event => setItemName(event.target.value)}
                       value={itemName} />
                <div className="btn-container">
                    <div className="msg">{msg}</div>
                    <a className="default-btn" onClick={actionOnClick}>Сохранить</a>
                </div>
            </form>
        </ModalWindow>
    )
}

PositionModal.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    onModalState: PropTypes.func,
    position: PropTypes.object,
    action: PropTypes.func
}


export {PositionModal}
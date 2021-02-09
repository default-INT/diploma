import React from 'react'
import { editIcon, deleteIcon } from "../../icons"
import PropTypes from "prop-types";
import '../../css/EditableTable.css'

const transformItemToArray = item => {
    const array = []
    for (let prop in item) {
        if (prop !== 'id') {
            array.push(item[prop])
        }
    }
    return array
}

const EditableTable = ({data = [], header = [], onDeleteItem = (id) => id,
                           onEditItem = (item) => item, children}) => {

    return (
        <div className="item-list">
            <div className="item head">
                {header.map((head, i) => <div key={i}>{head}</div>)}
                <div/>
            </div>
            {data.map(item => (
                <div key={item.id} id={item.id} className="item">
                    {transformItemToArray(item).map((tItem, i) => (
                        <div key={item.id + i}>{tItem}</div>
                    ))}
                    <div className='actions'>
                        <a onClick={() => onEditItem(item)}>
                            <img src={editIcon} width={20} alt=""/>
                        </a>
                        <a onClick={() => onDeleteItem(item)}>
                            <img src={deleteIcon} width={20} alt=""/>
                        </a>
                    </div>
                </div>
            ))}
            {children}
        </div>
    )
}

EditableTable.propTypes = {
    data: PropTypes.array,
    header: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func
}

export default EditableTable
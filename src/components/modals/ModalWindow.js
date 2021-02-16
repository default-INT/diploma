import React from 'react'
import PropTypes from "prop-types";
import '../../css/ModalWindow.css'


const ModalWindow = ({title = 'TITLE', children, onModalState}) => {
    return (
        <div id="openModal" className="modal">
            <div className="modal-dialog img-setting-block">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{title}</h3>
                        <a title="Close" className="close" onClick={() => onModalState(false)}>×</a>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalWindow.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    onModalState: PropTypes.func
}

export default ModalWindow
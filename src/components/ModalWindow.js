import React from 'react'
import '../css/ModalWindow.css'


const ModalWindow = ({children, onModalState}) => {
    return (
        <div id="openModal" className="modal">
            <div className="modal-dialog img-setting-block">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Add new image</h3>
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

export default ModalWindow
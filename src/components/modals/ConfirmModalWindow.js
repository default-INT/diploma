import React from "react";
import ModalWindow from "./ModalWindow";
import PropTypes from "prop-types";

const ConfirmModalWindow = (
    {title = 'Подтеверждение',
        action = () => '',
        actionName='CONFIRM',
        children = '',
        onModalState
    }) => {

    return (
        <ModalWindow title={title} onModalState={onModalState}>
            <div>{children}</div>
            <div className="btn-container confirm-btn-box">
                <a className="default-btn" onClick={() => {
                    action()
                    onModalState(false)
                }}>
                    {actionName}
                </a>
            </div>
        </ModalWindow>
    )
}

ConfirmModalWindow.propTypes = {
    title: PropTypes.string,
    action: PropTypes.func,
    actionName: PropTypes.string,
    children: PropTypes.node,
    onModalState: PropTypes.func
}

export default ConfirmModalWindow
import React from "react";
import PropTypes from "prop-types";
import { questionIcon } from "../../icons"

const DefaultIconBtn = ({onClick = () => '', icon = questionIcon}) => {
    return (
        <a className='default-icon-btn' onClick={onClick}>
            <img src={icon} width={30} alt=""/>
        </a>
    )
}

DefaultIconBtn.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string
}

export { DefaultIconBtn }
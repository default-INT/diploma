import React from "react";
import PropTypes from "prop-types";
import { questionIcon } from "../../icons"

const DefaultIconBtn = ({onClick = () => '', icon = questionIcon, width = 30}) => {
    return (
        <a className='default-icon-btn' onClick={onClick}>
            <img src={icon} width={width} alt=""/>
        </a>
    )
}

DefaultIconBtn.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string
}

export { DefaultIconBtn }
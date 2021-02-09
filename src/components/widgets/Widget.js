import React from 'react'
import PropTypes from 'prop-types'
import '../../css/Widget.css'
import { questionIcon } from '../../icons.js'

const Widget = ({title = 'TITLE', color='#1cc98a', value = 'SOME_VALUE', icon = questionIcon}) => {
    return (
        <div className="widget medium-shadow" style={{borderLeftColor: color}}>
            <div className="info">
                <div className="title" style={{color}}>{title}</div>
                <div className="value">{value}</div>
            </div>
            <div className="icon">
                <img src={icon} width={50} alt=""/>
            </div>
        </div>
    )
}

Widget.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string
}

export {Widget}
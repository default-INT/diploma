import React from 'react'
import PropTypes from 'prop-types'


const SimpleFragment = ({title = 'TITLE', style = {}, children}) => {
    return (
        <div className="fragment medium-shadow" style={{...style}}>
            <div className="title">
                {title}
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

SimpleFragment.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node
}

export {SimpleFragment}
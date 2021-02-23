import React from 'react'
import PropTypes from 'prop-types'


const SimpleFragment = ({title = 'TITLE', children, ...otherProps}) => {
    return (
        <div className="fragment medium-shadow" {...otherProps}>
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

export default SimpleFragment
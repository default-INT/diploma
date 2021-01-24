import React from 'react'
import PropTypes from 'prop-types'


const SimpleFragment = ({title = 'TITLE', children}) => {
    return (
        <div className="fragment medium-shadow">
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
    title: PropTypes.string,
    children: PropTypes.node
}

export {SimpleFragment}
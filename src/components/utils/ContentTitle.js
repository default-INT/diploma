import React from "react";
import PropTypes from "prop-types";

const ContentTitle = ({children, ...props}) => (
    <div className="content-title" {...props}>
        {children}
    </div>
)

ContentTitle.propTypes = {
    children: PropTypes.node
}

export { ContentTitle }
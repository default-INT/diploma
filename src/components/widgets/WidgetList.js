import React from "react";
import PropTypes from "prop-types";
import {Widget} from "./Widget";

const WidgetList = ({children, ...otherProps}) => {
    return (
        <div className="fragment-list" {...otherProps}>
            {children}
        </div>
    )
}

WidgetList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Widget)),
    style: PropTypes.object
}

export default WidgetList
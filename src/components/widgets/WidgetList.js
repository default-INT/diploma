import React from "react";
import PropTypes from "prop-types";
import {Widget} from "./Widget";

const WidgetList = ({children, style}) => {
    return (
        <div className="fragment-list" style={{...style}}>
            {children}
        </div>
    )
}

WidgetList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Widget)),
    style: PropTypes.object
}

export default WidgetList
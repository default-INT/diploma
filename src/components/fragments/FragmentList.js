import React from "react";
import PropTypes from "prop-types";
import {SimpleFragment} from "./index";

const FragmentList = ({children}) => {
    return (
        <div className="fragment-list">
            {children}
        </div>
    )
}

FragmentList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(SimpleFragment)).isRequired
}

export default FragmentList
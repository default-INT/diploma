import React from "react";

import {Widget} from "./Widget";


/**
 *
 * @param dataItem {DataItem}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const DataWidget = ({dataItem, ...props}) => {
    return (
        <Widget
            title={dataItem.name.toUpperCase()}
            value={dataItem.value}
            color={dataItem.color}
            icon={dataItem.iconUri}
        />
    );
};

export default DataWidget;
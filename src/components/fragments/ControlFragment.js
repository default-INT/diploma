import React, {Fragment} from "react";
import {DefaultIconBtn, SimpleFragment} from "../";
import {addIcon} from "../../icons";

const Title = ({name, onClick}) => (
    <Fragment>
        <div>{name}</div>
        <DefaultIconBtn icon={addIcon} onClick={onClick} />
    </Fragment>
)

const ControlFragment = ({title, style, children, onClick}) => {
    return (
        <SimpleFragment title={<Title name={title} onClick={onClick} />} style={{...style}}>
            {children}
        </SimpleFragment>
    )
};

ControlFragment.prototype = SimpleFragment

export default ControlFragment
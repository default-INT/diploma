import React, {Fragment} from "react";
import {SimpleFragment} from "./SimpleFragment";
import addIcon from "../../icon/add.svg";

const Title = ({name, onClick}) => (
    <Fragment>
        <div>{name}</div>
        <a className='default-icon-btn' onClick={onClick}>
            <img src={addIcon} width={30} alt=""/>
        </a>
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
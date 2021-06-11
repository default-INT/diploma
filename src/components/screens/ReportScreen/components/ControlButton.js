import React from "react";
import styled, {css} from "styled-components";
import {leftArrowBlackIcon, questionIcon, rightArrowBlackIcon} from "../../../../icons";
import {DefaultIconBtn} from "../../../utils";


const ControlButtonWrapper = styled.td`
  ${props => props.left && css`
    float: left;
  `}
  ${props => props.right && css`
    float: right;
  `}
`;

const ControlButton = (props) => {
    const imgUri = props.right ? rightArrowBlackIcon :
        props.left ? leftArrowBlackIcon : questionIcon;
    return (
        <ControlButtonWrapper {...props}>
            <DefaultIconBtn
                icon={imgUri}
                onClick={props.onClick}
                style={{padding: '.4rem'}}/>
        </ControlButtonWrapper>
    )
};

export default ControlButton;

import React from "react";
import styled from "styled-components";

const BtnWrapper = styled.a`
  text-align: center;
  padding: .5em;
`;

const DefaultButton = props => {
    return (
        <BtnWrapper className="default-btn" {...props}>
            {props.children}
        </BtnWrapper>
    )
};

export default DefaultButton;
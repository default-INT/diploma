import React from "react";

import styled from "styled-components";


const TooltipItem = styled.span`
  width: 100%;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  line-height: 1.5em;
  visibility: hidden;
  background-color: #5072e0;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -50%;
  opacity: 0;
  transition: .3s;
  transform: translate3d(0px, 20px, 0px);
  width: 100%;
  
`;

const Tooltip = props => {
    const {items, color, children} = props;

    if (!items) {
        return (
            <Wrapper {...props} style={{backgroundColor: color}}>
                {children}
            </Wrapper>
        )
    }

    return (
        <Wrapper {...props}  style={{backgroundColor: color}}>
            {items.map((item, idx) => (
                <TooltipItem key={item + idx}>
                    {item}
                </TooltipItem>
            ))}
        </Wrapper>
    )
};

export default Tooltip;
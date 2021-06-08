import React from "react";
import styled from "styled-components/native";

import Colors from "../../../constants/colors";

const TitleContainer = styled.View`
  padding: 8px;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.whitesmoke};
  flex-direction: row;
  justify-content: space-between
`;

export default TitleContainer;
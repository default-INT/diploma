import styled, {css} from "styled-components/native/dist/styled-components.native.esm";
import Colors from "../../../constants/colors";


const InnerContainer = styled.View`
  padding: 10px;
  ${({borderBottom}) => borderBottom && css`
    border-bottom-width: 2px;
    border-bottom-color: ${Colors.whitesmoke};
  `}
`;

export default InnerContainer;
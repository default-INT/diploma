import React from "react";
import {Button} from "react-native";
import styled from "styled-components/native";

import Colors from "../constants/colors";


const BtnContainer = styled.View`
  margin-top: 20px;
`

const TryAgainButton = ({onPress, ...props}) => {
    return (
        <BtnContainer {...props}>
            <Button title='Попробовать снова'
                    color={Colors.primary}
                    onPress={onPress}/>
        </BtnContainer>
    );
}

export default TryAgainButton;
import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {MaterialIcons} from '@expo/vector-icons';

import Colors from '../../constants/colors'

const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color={Colors.white}
        />
    );
};

export default CustomHeaderButton;

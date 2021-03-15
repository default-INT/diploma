import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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

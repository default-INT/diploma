import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Контейнер для JSX компонента, добавляющие стандартные стили в виде тени и границы.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Card;

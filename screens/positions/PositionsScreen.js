import React from "react";
import {View, Text, StyleSheet, FlatList, Alert} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../default-options";
import {MaterialHeaderButton} from "../../components/UI";
import {PositionItem} from "../../components";
import {positionActions} from "../../store/actions";


const PositionsScreen = props => {
    const positions = useSelector(state => state.positions.availablePositions);
    const dispatch = useDispatch();

    const onEditHandler = (positionId) => {
        props.navigation.navigate('EditPosition', {
            positionId
        })
    };

    const onDeleteHandler = positionId => {
        Alert.alert('Удаление', 'Вы действительно хотите удалить тариф?', [
            { text: 'Нет', style: 'default' },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    dispatch(positionActions.deletePosition(positionId));
                }
            }
        ]);
    };

    return (
        <FlatList
            data={positions}
            renderItem={itemData=> (<PositionItem 
                position={itemData.item}
                    onEdit={onEditHandler.bind(this, itemData.item.id)} 
                    onDelete={onDeleteHandler.bind(this, itemData.item.id)}
                />)}
        />
    )
}

export const positionScreenOptions = navData => {
    return {
        headerTitle: 'Тарифы',
        headerLeft: () => (
            <HeaderToggleButton navData={navData} />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Add"
                    iconName="add-circle-outline"
                    onPress={() => {
                        navData.navigation.navigate('EditPosition', {})
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});

export default PositionsScreen;
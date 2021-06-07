import React, {useEffect, useCallback} from "react";
import {View, ActivityIndicator, StyleSheet, FlatList, Alert, Button, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {HeaderToggleButton} from "../../default-options";
import {MaterialHeaderButton} from "../../../components/UI";
import {PositionItem} from "../../../components";
import {positionActions} from "../../../store/actions";
import Colors from "../../../constants/colors";


const PositionsScreen = ({navigation, ...props}) => {
    const {loading : isLoading, availablePositions : positions, error } = useSelector(state => state.positions);

    const dispatch = useDispatch();

    const loadPositions = useCallback(() => {
        dispatch(positionActions.fetchPosition());
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = navigation.dangerouslyGetParent().addListener('focus', () => {
            loadPositions();
        });
        return () => {
            unsubscribe();
        }
    }, [navigation]);

    const onEditHandler = (positionId) => {
        navigation.dangerouslyGetParent().navigate('EditPosition', {
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

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова' color={Colors.primary} onPress={() => loadPositions()}/>
                </View>
            </View>
        )
    }

    if (positions.length === 0) {
        return (
            <View style={styles.screen}>
                <Text>Не было найденно ни одного тарифа</Text>
                <View style={styles.btnStyle}>
                    <Button title='Попробовать снова' color={Colors.primary} onPress={() => loadPositions()}/>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={positions}
            renderItem={itemData=> (<PositionItem 
                position={itemData.item}
                    onEdit={onEditHandler.bind(this, itemData.item.id)} 
                    onDelete={onDeleteHandler.bind(this, itemData.item.id)}
                />)}
            refreshing={isLoading}
            onRefresh={() => dispatch(positionActions.fetchPosition())}
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
    btnStyle: {
        marginTop: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scream: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PositionsScreen;
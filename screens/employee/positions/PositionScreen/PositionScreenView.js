import React from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native";

import {OverviewContainer, PositionItem} from "../../../../components";
import Colors from "../../../../constants/colors";
import {positionActions} from "../../../../store/actions";


const PositionScreenView = props => {

    const {
        isLoading,
        positions,
        error,
        onRefresh
    } = props;

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
                isNotEdit
            />)}
            refreshing={isLoading}
            onRefresh={onRefresh}
        />
    )
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

export default PositionScreenView;
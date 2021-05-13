import React from "react";
import {View, Text, ActivityIndicator, StyleSheet, FlatList} from "react-native";

import {UnloadingEvent} from "../../../components";
import Colors from "../../../constants/colors";

const UnloadingScreenOverviewView = props => {
    const {
        unloadingEvents,
        onDeleteEvent,
        loading,
        error,
        loadUnloadingEvents
    } = props;

    if (loading) {
        return (
            <View style={styles.centredScreen} >
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centredScreen} >
                <Text>{error}</Text>
            </View>
        )
    }
    return (
        <FlatList
            data={unloadingEvents}
            renderItem={dataItem => <UnloadingEvent onDeleteEvent={onDeleteEvent} unloadingItem={dataItem.item} />}
            refreshing={loading}
            onRefresh={() => loadUnloadingEvents()}
        />
    )
}

const styles = StyleSheet.create({
    centredScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UnloadingScreenOverviewView;
import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {UnloadingEvent} from "../../../components";

const UnloadingScreenOverviewView = props => {
    const {
        unloadingEvents
    } = props;
    return (
        <FlatList
            data={unloadingEvents}
            renderItem={dataItem => <UnloadingEvent unloadingItem={dataItem.item} />}
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
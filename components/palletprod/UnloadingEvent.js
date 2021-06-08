import React from "react";
import {StyleSheet, Text, View} from "react-native";

import Card from "../Card";
import {toDateTimeFormat} from "../../utils/date-utils";
import {TouchWrapper} from "../UI";
import styled from "styled-components/native";
import {DateTitle, InnerContainer} from "./components";


const Wrapper = styled.View`
  padding: 20px
`;

const UnloadingEvent = ({unloadingItem, onDeleteEvent, ...props}) => {
    const date = new Date(unloadingItem.dateTimeEdit);
    return (
        <Card style={styles.card}>
            <TouchWrapper onLongPress={() => onDeleteEvent(unloadingItem.id)}>
                <Wrapper>
                    <DateTitle date={date} dateFormatter={toDateTimeFormat} />
                    <InnerContainer>
                        {unloadingItem.storageItems.map(storageItem => (
                            <View key={storageItem.id} style={styles.field}>
                                <Text>{storageItem.positionName}</Text>
                                <Text>{storageItem.count} шт</Text>
                            </View>
                        ))}
                    </InnerContainer>
                </Wrapper>
            </TouchWrapper>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
});

export default UnloadingEvent;
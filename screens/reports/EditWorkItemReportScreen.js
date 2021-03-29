import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Picker} from "@react-native-picker/picker";

import {FormTitle, CardForm, FormBody, Input} from "../../components";
import { MaterialHeaderButton, TouchableButton } from "../../components/UI";
import Colors from "../../constants/colors";
import DayStatItem from "../../components/palletprod/DayStatItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const EditWorkItemReportScreen = ({navigation, route,...props}) => {

    const workItemId = route.params.workItemId;
    const editedWorkItem = useSelector(state => state.reports.selectedReport.employeeItems
        .map(({workItems}) => workItems)
        .reduce((w1, w2) => w1.concat(w2))
        .find(({id}) => id === workItemId));

    const availablePositions = useSelector(state => state.positions.availablePositions);

    const [itemNum, setItemNum] = useState(editedWorkItem ? editedWorkItem.itemNum : 0);
    const [selectedPositionId, setSelectedPositionId] = useState(editedWorkItem ? editedWorkItem.position.id
        : availablePositions[0].id);

    const dispatch = useDispatch();


    const emptyWorkItemText = <Text>Список работ сотрудника за день пуст!</Text>;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (workItemId ? 'Редактирование' : 'Добавление') + ' работы',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                />
            </HeaderButtons>
        })
    }, [navigation]);

    const selectedPosition = availablePositions.find(({id}) => id === selectedPositionId);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <KeyboardAvoidingView>
                <CardForm>
                    <Picker
                        selectedValue={selectedPositionId}
                        onValueChange={((itemValue, itemIndex) => {
                            setSelectedPositionId(itemValue);
                        } )}
                    >
                        {availablePositions.map(({name, id}) =>  <Picker.Item key={id} label={name} value={id} />)}
                    </Picker>
                </CardForm>
                <CardForm>
                    <FormTitle titleLine>
                        <Text>Выполненная нагрузка</Text>
                    </FormTitle>
                    <FormBody>
                        <View style={styles.field}>
                            <Text>Ставка</Text>
                            <Text>{selectedPosition.itemTariff} {selectedPosition.itemName}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text>Выполнено за день</Text>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.numInput}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    value={itemNum + ''}
                                    onChangeText={text => setItemNum(text)}
                                />
                                <Text>{selectedPosition.itemName.split('/')[1]}</Text>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Text>Итоговый заработок</Text>
                            <Text>{selectedPosition.itemTariff * (+itemNum)} р.</Text>
                        </View>
                    </FormBody>
                </CardForm>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    editBtn: {
        opacity: .5,
        padding: 5
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5
    },
    numInput: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        marginRight: 10,
        textAlign: 'center'
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export default EditWorkItemReportScreen
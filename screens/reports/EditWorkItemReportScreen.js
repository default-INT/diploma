import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Picker} from "@react-native-picker/picker";

import {CardForm, FormBody, FormTitle} from "../../components";
import {positionActions, reportActions} from "../../store/actions";
import {MaterialHeaderButton} from "../../components/UI";
import Colors from "../../constants/colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {WorkItem} from "../../models";

const EditWorkItemReportScreen = ({navigation, route,...props}) => {

    const workItemId = route.params.workItemId;
    const employeeItemId = route.params.employeeItemId;

    const selectedEmployeeItem = useSelector(state => state.reports.selectedEmployeeItem);


    const editedWorkItem = selectedEmployeeItem.workItems
        .find(workItem => workItem.id === workItemId);

    const {availablePositions, loading: loadingPosition} = useSelector(state => state.positions);

    const [itemNum, setItemNum] = useState(editedWorkItem ? editedWorkItem.itemNum : 0);
    const [selectedPositionId, setSelectedPositionId] = useState(editedWorkItem ? editedWorkItem.position.id
        : 0);

    const dispatch = useDispatch();

    const loadPositions = useCallback(() => {
        dispatch(positionActions.fetchPosition())
    }, [dispatch]);

    const onSaveHandler = useCallback(() => {
        if (editedWorkItem) {
            dispatch(reportActions.updateWorkItemReport(new WorkItem(
                    editedWorkItem.id,
                    selectedPosition,
                    +itemNum,
                    +(selectedPosition.itemTariff * itemNum).toFixed(2)
                )
            ));
            return;
        }
        dispatch(reportActions.addWorkItemToReport(new WorkItem(
            new Date().toISOString(),
            selectedPosition,
            +itemNum,
            +(selectedPosition.itemTariff * itemNum).toFixed(2)
        ), employeeItemId));
    }, [employeeItemId, selectedPositionId, itemNum]);

    useEffect(() => {
        loadPositions();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (workItemId ? 'Редактирование' : 'Добавление') + ' работы',
            headerRight: () => <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                <Item
                    title="Save"
                    iconName="save"
                    onPress={() => {
                        onSaveHandler();
                        navigation.goBack();
                    }}
                />
            </HeaderButtons>
        })
    }, [navigation, onSaveHandler]);

    useEffect(() => {
        if (availablePositions && availablePositions.length !== 0) {
            setSelectedPositionId(editedWorkItem ? editedWorkItem.position.id
                : availablePositions[0].id);
        }
    }, [availablePositions]);

    const selectedPosition = availablePositions.find(({id}) => id === selectedPositionId);

    if (availablePositions.length === 0 || !selectedPosition || loadingPosition) {
        return (
            <View style={styles.screenLoader}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior='position' style={styles.screen} enabled={true}>
            <ScrollView>
                <View >
                    <CardForm>
                        {availablePositions.length === 0 ? <View>
                                <ActivityIndicator size='large' color={Colors.primary} />
                        </View> :
                            <Picker
                                selectedValue={selectedPositionId}
                                onValueChange={((itemValue, itemIndex) => {
                                    setSelectedPositionId(itemValue);
                                } )}
                            >
                                {availablePositions.map(({name, id}) =>  <Picker.Item key={id} label={name} value={id} />)}
                            </Picker>
                        }
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
                                <Text>{(selectedPosition.itemTariff * (+itemNum)).toFixed(2)} р.</Text>
                            </View>
                        </FormBody>
                    </CardForm>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
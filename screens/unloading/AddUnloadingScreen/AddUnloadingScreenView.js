import React from "react";
import {View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../../constants/colors";
import {toDateFormat} from "../../../utils";
import {TouchableButton} from "../../../components/UI";
import {TitleText} from "../../../components/UI/texts";
import {FormRow, CardForm, FormBody, FormTitle} from "../../../components/card-form";
import {setDateTimeCurrentTimeZone, toDateTimeFormat} from "../../../utils/date-utils";

const AddUnloadingScreenView = props => {
    const {
        storagePositions,
        loading,
        error,

        formState,
        changeFormState,
        addLoading,

        timeOnChange,
        unloadingDate,
        showDatePicker,
        onShowDatePicker,
        dateOnChange
    } = props;

    //TODO: check for IOS
    const showDatePicket = (date, onChangeDate, onChangeTime) => (
        <>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
            />
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
            />
        </>
    )

    if (loading || !formState || addLoading) {
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
        <ScrollView>
            <View>
                <CardForm>
                    <FormTitle >
                        <TitleText>Дата выгрузки:  {toDateTimeFormat(unloadingDate)}</TitleText>
                        <TouchableButton iconName="mode-edit" onPress={() => onShowDatePicker()}
                                         size={24} style={styles.editBtn} />
                    </FormTitle>
                    {showDatePicker && (showDatePicket(unloadingDate, dateOnChange, timeOnChange))}
                </CardForm>
                <CardForm>
                    <FormTitle titleLine>
                        <TitleText>Количество выгруженных поддонов</TitleText>
                    </FormTitle>
                    <FormBody>
                        {storagePositions.map(pos => (
                            <FormRow key={pos.id}>
                                <Text>{pos.name}</Text>
                                <View style={styles.rowItem}>
                                    <TextInput
                                        style={styles.input}
                                        value={formState[pos.id]}
                                        onChangeText={text => changeFormState(pos.id, text)}
                                        keyboardType='numeric'
                                        maxLength={3}
                                    />
                                    <Text>{pos.itemName.split('/')[1]}</Text>
                                </View>
                            </FormRow>
                        ))}
                    </FormBody>
                </CardForm>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    centredScreen: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowItem: {
        flexDirection: 'row'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        marginRight: 10,
        textAlign: 'center'
    }
});

export default AddUnloadingScreenView;
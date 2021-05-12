import React from "react";
import {View, Text, StyleSheet, ActivityIndicator, ScrollView} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../../constants/colors";
import {toDateFormat} from "../../../utils";
import {TouchableButton} from "../../../components/UI";
import {TitleText} from "../../../components/UI/texts";
import {FormRow, CardForm, FormBody, FormTitle} from "../../../components/card-form";

const AddUnloadingScreenView = props => {
    const {
        storagePositions,
        loading,
        error,

        unloadingDate,
        showDatePicker,
        onShowDatePicker,
        dateOnChange
    } = props;

    const showDatePicket = (date, onChange) => (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={onChange}
        />
    )

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
        <ScrollView>
            <View>
                <CardForm>
                    <FormTitle >
                        <TitleText>Дата выгрузки:  {toDateFormat(unloadingDate)}</TitleText>
                        <TouchableButton iconName="mode-edit" onPress={() => onShowDatePicker()}
                                         size={24} style={styles.editBtn} />
                    </FormTitle>
                    {showDatePicker && (showDatePicket(unloadingDate, dateOnChange))}
                </CardForm>
                <CardForm>
                    <FormTitle titleLine>
                        <TitleText>Количество выгруженных поддонов</TitleText>
                    </FormTitle>
                    <FormBody>
                        {storagePositions.map(pos => (
                            <FormRow key={pos.id}>
                                <Text>{pos.name}</Text>
                                <View>

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
    }
});

export default AddUnloadingScreenView;
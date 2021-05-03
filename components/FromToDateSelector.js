import React from "react";
import {StyleSheet, Text} from "react-native";

import {CardForm, FormTitle} from "./card-form";
import {toDateFormat} from "../utils";
import {TouchableButton} from "./UI";
import DateTimePicker from "@react-native-community/datetimepicker";


const FromToDateSelector = ({fromDate, toDate, fromDateOnChange, toDateOnChange, setDatePicker, showDatePicker}) => {
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
    return (
        <CardForm>
            <FormTitle >
                <Text style={styles.titleText}>С даты:  {toDateFormat(fromDate)}</Text>
                <TouchableButton iconName="mode-edit" onPress={() => setDatePicker('from')}
                                 size={24} style={styles.editBtn} />
            </FormTitle>
            {showDatePicker === 'from' && (showDatePicket(fromDate, fromDateOnChange))}
            <FormTitle >
                <Text style={styles.titleText}>По дату: {toDateFormat(toDate)}</Text>
                <TouchableButton iconName="mode-edit" onPress={() => setDatePicker('to')}
                                 size={24} style={styles.editBtn} />
            </FormTitle>
            {showDatePicker === 'to' && (showDatePicket(toDate, toDateOnChange))}
        </CardForm>
    )
}

const styles = StyleSheet.create({
    editBtn: {
        opacity: .5,
        padding: 5
    },
    titleText: {
        fontSize: 16
    }
});

export default FromToDateSelector;
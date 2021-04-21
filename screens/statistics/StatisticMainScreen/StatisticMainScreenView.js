import React from "react";
import {Button, Text, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {TouchableButton} from "../../../components/UI";
import {CardForm, FormTitle} from "../../../components";
import {toDateFormat} from "../../../utils";
import Colors from "../../../constants/colors";
import styles from "./styles";


const StatisticMainScreenView = props => {
    const {
        fromDate,
        toDate,
        showDatePicker,
        fromDateOnChange,
        toDateOnChange,
        setDatePicker
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

    return (
        <View>
            <CardForm>
                <FormTitle >
                    <Text style={styles.titleText}>С даты:  {toDateFormat(fromDate)}</Text>
                    <TouchableButton iconName="mode-edit" onPress={() => setDatePicker('from')}
                                     size={24} style={styles.editBtn} />
                    {showDatePicker === 'from' && (showDatePicket(fromDate, fromDateOnChange))}
                </FormTitle>
                <FormTitle >
                    <Text style={styles.titleText}>По дату: {toDateFormat(toDate)}</Text>
                    <TouchableButton iconName="mode-edit" onPress={() => setDatePicker('to')}
                                     size={24} style={styles.editBtn} />
                    {showDatePicker === 'to' && (showDatePicket(toDate, toDateOnChange))}
                </FormTitle>
                <View>
                    <Button title='Получить отчёт' color={Colors.primary} />
                </View>
            </CardForm>
        </View>
    )
}

export default StatisticMainScreenView;
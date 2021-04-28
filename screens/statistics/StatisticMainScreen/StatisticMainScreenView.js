import React from "react";
import {Button, Text, View, ScrollView, ActivityIndicator} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {TouchableButton} from "../../../components/UI";
import {CardForm, FormTitle} from "../../../components";
import {toDateFormat} from "../../../utils";
import {StatisticEmployeeItem} from "../../../components";
import Colors from "../../../constants/colors";
import styles from "./styles";


const StatisticMainScreenView = props => {
    const {
        fromDate,
        toDate,
        showDatePicker,
        fromDateOnChange,
        toDateOnChange,
        setDatePicker,

        loading,
        fetchStatistic,
        employeeStatistic
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
            <View style={styles.centredScreen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
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
                        <Button title='Получить отчёт' color={Colors.primary} onPress={fetchStatistic} />
                    </View>
                </CardForm>
                {employeeStatistic && (<>
                        {employeeStatistic.map(item => (
                            <StatisticEmployeeItem key={item.employee} statistic={item}/>
                        ))}
                        <CardForm>
                            <FormTitle>
                                <Text>
                                    Суммарная выплата рабочим:
                                    <Text style={styles.totalSalaryText}>
                                        {employeeStatistic.length !== 0 ? ' ' + employeeStatistic.map(item => item.totalSalary)
                                            .reduce((a, b) => a + b) : ' ' + 0} р
                                    </Text>
                                </Text>
                            </FormTitle>
                        </CardForm>
                    </>
                )}
            </View>
        </ScrollView>
    )
}

export default StatisticMainScreenView;
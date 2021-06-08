import React from "react";
import {Button, Text, View, ScrollView, ActivityIndicator} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {TouchableButton} from "../../../../components/UI";
import {CardForm, FormTitle} from "../../../../components";
import {toDateFormat} from "../../../../utils";
import {StatisticEmployeeItem} from "../../../../components";
import Colors from "../../../../constants/colors";
import styles from "./styles";


const StatisticMainScreenView = props => {
    const {
        fromDate,
        toDate,
        showDatePicker,
        fromDateOnChange,
        toDateOnChange,
        setDatePicker,

        error,
        loading,
        fetchStatistic,
        employeesStatistic
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

    const getTotalSalary = employeesStatistic => {
        return employeesStatistic.length !== 0 ? ' ' + employeesStatistic.map(item => item.totalSalary)
            .reduce((a, b) => a + b).toFixed(2) : ' ' + 0;
    }

    return (
        <ScrollView>
            <View>
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
                    <View>
                        <Button title='Получить отчёт' color={Colors.primary} onPress={fetchStatistic} />
                    </View>
                </CardForm>
                {error && (<CardForm style={styles.centredCard}>
                    <Text>{error}</Text>
                </CardForm>)}
                {!error && employeesStatistic && (<>
                        {employeesStatistic.map(item => (
                            <StatisticEmployeeItem key={item.employee} statistic={item}/>
                        ))}
                        <CardForm>
                            <FormTitle>
                                <Text>
                                    Суммарная выплата рабочим:
                                    <Text style={styles.totalSalaryText}>
                                        {getTotalSalary(employeesStatistic)} р
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
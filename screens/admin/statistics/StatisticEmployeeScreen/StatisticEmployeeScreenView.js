import React from "react";
import {ActivityIndicator, Button, ScrollView, Text, View} from "react-native";
import {CardForm, EmployeePicker, FormTitle, StatisticEmployeeItem} from "../../../../components";
import styles from "../StatisticMainScreen/styles";
import {toDateFormat} from "../../../../utils";
import {TouchableButton} from "../../../../components/UI";
import Colors from "../../../../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const StatisticEmployeeScreenView = props => {
    const {
        fromDate,
        toDate,
        showDatePicker,
        fromDateOnChange,
        toDateOnChange,
        setDatePicker,

        employeeError,
        employeesLoading,
        employees,
        selectedEmployeeId,
        setSelectedEmployeeId,

        statisticByEmployee,
        loadStatisticByEmployee,

        error,
        loading,
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

    const EmployeeSelector = () => {
        if (employeesLoading) {
            return (
                <View style={styles.centredScreen}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            )
        }
        if (employeeError) {
            return (
                <View style={styles.centredScreen}>
                    <Text>{employeeError}</Text>
                </View>
            )
        }

        return (
            <EmployeePicker
                employees={employees}
                selectedEmployeeId={selectedEmployeeId}
                setSelectedEmployeeId={setSelectedEmployeeId}
            />
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
                    </FormTitle>
                    {showDatePicker === 'from' && (showDatePicket(fromDate, fromDateOnChange))}
                    <FormTitle >
                        <Text style={styles.titleText}>По дату: {toDateFormat(toDate)}</Text>
                        <TouchableButton iconName="mode-edit" onPress={() => setDatePicker('to')}
                                         size={24} style={styles.editBtn} />
                    </FormTitle>
                    {showDatePicker === 'to' && (showDatePicket(toDate, toDateOnChange))}
                </CardForm>

                <CardForm>
                    <FormTitle><Text>Выберите сотрудника</Text></FormTitle>
                    <EmployeeSelector />
                </CardForm>

                <CardForm>
                    <View>
                        <Button title='Получить отчёт' color={Colors.primary} onPress={() => loadStatisticByEmployee()} />
                    </View>
                </CardForm>
                {error && (<CardForm style={styles.centredCard}>
                    <Text>{error}</Text>
                </CardForm>)}
                {loading && <View style={styles.centredScreen}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>}
                {!error && !loading && statisticByEmployee && (
                    <StatisticEmployeeItem statistic={statisticByEmployee}/>
                )}

            </View>
        </ScrollView>
    )
}

export default StatisticEmployeeScreenView;
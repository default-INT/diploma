import React from "react";
import {StyleSheet, Text, View} from "react-native";
import styled, {css} from "styled-components/native";

import Card from "../Card";
import {nameDayOfWeek, toDateFormat} from "../../utils";
import Colors from "../../constants/colors";


const InnerContainer = styled.View`
  padding: 10px;
  ${({borderBottom}) => borderBottom && css`
    border-bottom-width: 2px;
    border-bottom-color: ${Colors.whitesmoke};
  `}
`

/**
 * JSX компонент отображения отчёта в соответсвующем формате.
 *
 * @param report {UserReport}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const UserReportItem = ({report, ...props}) => {

    return (
        <Card style={styles.card} >
            <View style={styles.touchable}>
                <View style={styles.reportContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{toDateFormat(report.date)}</Text>
                        <Text style={{
                            ...styles.titleText,
                            color: report.date.getDay() === 6 || report.date.getDay() === 0 ? Colors.red : Colors.black}}>
                            {nameDayOfWeek[report.date.getDay()].toUpperCase()}
                        </Text>
                    </View>
                    <InnerContainer borderBottom>
                        {report.workItems.length === 0 ?
                            <View style={styles.field}><Text>Работа за день не была выполнена.</Text></View> :
                            report.workItems.map(workItem => <View key={workItem.id} style={styles.field}>
                                <Text>{workItem.position.name}</Text>
                                <Text>{workItem.itemNum} {workItem.position.itemName.split('/')[1]}</Text>
                            </View>)
                        }
                    </InnerContainer>
                    <InnerContainer>
                        <Text>Заработок: <Text style={styles.salaryText}>{report.totalSalary} р</Text> </Text>
                    </InnerContainer>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    info: {
        padding: 10
    },
    title: {
        padding: 8,
        borderBottomWidth: 2,
        borderBottomColor: Colors.whitesmoke,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    reportContainer: {
        padding: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10
    },
    salaryText: {
        fontWeight: 'bold'
    },
});

export default UserReportItem;
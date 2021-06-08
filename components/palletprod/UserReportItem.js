import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {DateTitle, DefaultCard, InnerContainer, ReportField} from "./components";



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
        <DefaultCard style={styles.card} >
            <View style={styles.touchable}>
                <InnerContainer style={styles.reportContainer}>
                    <DateTitle date={report.date} />
                    <InnerContainer borderBottom>
                        {report.workItems.length === 0 ?
                            <View style={styles.field}><Text>Работа за день не была выполнена.</Text></View> :
                            report.workItems.map(workItem => <ReportField key={workItem.id}>
                                <Text>{workItem.position.name}</Text>
                                <Text>{workItem.itemNum} {workItem.position.itemName.split('/')[1]}</Text>
                            </ReportField>)
                        }
                    </InnerContainer>
                    <InnerContainer>
                        <Text>Заработок: <Text style={styles.salaryText}>{report.totalSalary} р</Text> </Text>
                    </InnerContainer>
                </InnerContainer>
            </View>
        </DefaultCard>
    )
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    salaryText: {
        fontWeight: 'bold'
    },
});

export default UserReportItem;
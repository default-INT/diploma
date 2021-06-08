import React from "react";
import {Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";

import Colors from "../../constants/colors";
import {DateTitle, DefaultCard, InnerContainer, ReportField} from "./components";


/**
 * JSX компонент отображения отчёта в соответсвующем формате.
 *
 * @param report {Report}
 * @param onLongPress {function}
 * @param onPress {function}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const ReportItem = ({report, onLongPress, onPress, ...props}) => {
    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

    const dayStats = report.dayStats.filter(({position}) => position.isStorage);

    return (
        <DefaultCard>
            <View style={styles.touchable}>
                <TouchableComponent onPress={() => onPress(report)} useForeground onLongPress={() => onLongPress(report.id)}>
                    <InnerContainer>
                        <DateTitle date={report.date} />
                        <InnerContainer>
                            {dayStats.length === 0 ?
                                <View style={styles.field}><Text>Не было сбито ни одного поддона.</Text></View> :
                                dayStats.map(dayStat => <ReportField key={dayStat.id}>
                                        <Text>{dayStat.position.name}</Text>
                                        <Text>{dayStat.totalNum} шт</Text>
                                    </ReportField>)
                            }
                        </InnerContainer>
                    </InnerContainer>
                </TouchableComponent>
            </View>
        </DefaultCard>
    )
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
});

export default ReportItem;
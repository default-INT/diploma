import React from "react";
import {ActivityIndicator, Text, View} from "react-native";

import {CardForm, StatisticEmployeeItem, TryAgainButton} from "../../../../components";
import styles from "../../../admin/statistics/StatisticMainScreen/styles";
import Colors from "../../../../constants/colors";

const StatisticScreenView = props => {
    const {userStatistic, loading, error, loadData} = props;

    return (
        <>
            {error && (<CardForm style={styles.centredCard}>
                <Text>{error}</Text>
                <TryAgainButton onPress={loadData} />
            </CardForm>)}
            {loading && <View style={styles.centredScreen}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>}
            {!error && !loading && userStatistic && (
                <StatisticEmployeeItem statistic={userStatistic}/>
            )}
        </>
    )
};

export default StatisticScreenView;
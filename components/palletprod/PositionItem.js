import React, {useState} from "react";
import {Button, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";

import Card from "../Card"
import Colors from "../../constants/colors"


/**
 * Компонент отображения тарифа на экране с определённой стилизации в соответствующем формате.
 *
 * @param position {Position}
 * @param props {object}
 * @returns {JSX.Element}
 * @constructor
 */
const PositionItem = ({position, isNotEdit, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);

    const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;


    return (
        <Card style={styles.card} >
            <View style={styles.touchable}>
                <TouchableComponent onPress={() => setIsOpen(prev => !prev)} useForeground>
                    <View style={styles.employeeContainer}>
                        <View>
                            <View style={{...styles.title, borderBottomWidth: isOpen ? 2 : 0}}>
                                <Text style={styles.titleText}>{position.name}</Text>
                            </View>
                            {isOpen ? (<View>
                                <View style={styles.info}>
                                    <View style={styles.field}>
                                        <Text>Тариф</Text>
                                        <Text>{position.itemTariff} {position.itemName}</Text>
                                    </View>
                                </View>
                                {!isNotEdit && (
                                    <View style={styles.btnContainer}>
                                        <View style={styles.btn}>
                                            <Button color={Colors.orange} title='Редактировать' onPress={props.onEdit} />
                                        </View>
                                        <View style={styles.btn}>
                                            <Button color={Colors.red} title='Удалить'  onPress={props.onDelete} />
                                        </View>
                                    </View>
                                )}
                            </View>) : null}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    btn: {
        width: 180,
        marginVertical: 5,
    },
    btnContainer: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
    employeeContainer: {
        padding: 20
    },
    title: {
        borderBottomColor: Colors.whitesmoke,
        borderBottomWidth: 2,
        padding: 10,
    },
    info: {
        padding: 10,
        paddingHorizontal: 40
    },
    titleText: {
        fontSize: 18
    }
});

export default PositionItem;

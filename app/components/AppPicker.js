import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Picker, Modal, Button, FlatList} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({icon,  items, placeholder, selectedItem, numberOfColumns = "1", onSelectItem, PickerItemComponent = PickerItem , width="100%"}) {

    const [modalVisible, setModalVisible] = useState("false");

    return (
        <>
            <TouchableWithoutFeedback onPress={() =>setModalVisible(true)}>
                <View style={[styles.container, {width}]}>
                    {icon && <MaterialCommunityIcons name={icon} size={25} style={styles.icon} color={defaultStyles.colors.medium}/>}
                    { selectedItem ? <AppText style={styles.text}>{selectedItem.label}</AppText> : <AppText style={styles.placeholder}>{placeholder}</AppText>}

                    <MaterialCommunityIcons name="chevron-down" size={25} color={defaultStyles.colors.medium}/>
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button onPress={() => setModalVisible(false)} title="Fermer"/>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({item}) =>
                            <PickerItemComponent label={item.label}
                                                 item={item}
                            onPress={() => {
                                setModalVisible(false);
                                onSelectItem(item);
                            }
                            }/>
                        }
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1
    },
    text: {
        flex: 1
    }
});

export default AppPicker;
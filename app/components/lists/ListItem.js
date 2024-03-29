import React from 'react';
import {View, StyleSheet,Image, TouchableHighlight} from "react-native";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from '../../config/color';

function ListItem({title, subTitle, IconComponent,image, onPress, renderRightActions, style}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight
                underlayColor={colors.light}
                onPress={onPress}
            >
                <View style={[styles.container, style]}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={[styles.detailsContainer, style]}>
                        <AppText style={styles.title}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "500"
    },
    subTitle: {
        color: colors.medium,
    }
});

export default ListItem;
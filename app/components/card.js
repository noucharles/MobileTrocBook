import React from 'react';
import {View, StyleSheet, Image, Text, TouchableWithoutFeedback} from "react-native";

import colors from '../config/color.js';

function Card({title, subTitle, imageUrl, onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: imageUrl}}/>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.subTitle} numberOfLines={2}>{subTitle}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: 'stretch'
    },
    detailsContainer: {
        padding: 20
    },
    title: {
        marginBottom: 7
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold"
    }
});

export default Card;
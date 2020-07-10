import React from 'react';
import {View , Image, StyleSheet, Text} from "react-native";
import AppText from "../components/AppText";

import colors from '../config/color';
import ListItem from "../components/lists/ListItem";

function ListingDetailsScreen(props) {
    return (
        <View>
            <Image style={styles.image} source={require('../assets/svtTle.jpg')} />

            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>Chemin de la reussite Tle</AppText>
                <AppText style={styles.subTitle}>Deido</AppText>

                <View style={styles.userContainer}>
                    <ListItem
                        title="Bastien KAMAHA"
                        subTitle="5 Annonces"
                    />
                </View>

                <View style={styles.userContainer}>
                    <AppText style={{ fontWeight: "500"}}>Description du livre</AppText>
                    <Text>Bord de sciences Terminale D en trés bon état</Text>
                </View>

                <View style={styles.userContainer}>
                    <AppText style={{ fontWeight: "500"}}>Exigences</AppText>
                    <Text>A la recherche de Nathan Tle C</Text>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'stretch'
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "500"
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
    userContainer: {
        marginVertical: 10
    }
});

export default ListingDetailsScreen;
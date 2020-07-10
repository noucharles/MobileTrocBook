import React from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/card";

import colors from '../config/color';

const listings = [
    {
        id: 1,
        title: 'Chemin de la réussite Tle',
        subTitle: 'Deido',
        image: require("../assets/svtTle.jpg")
    },
    {
        id: 2,
        title: 'Nathan 6e',
        subTitle: 'Kotto',
        image: require("../assets/jacket.jpg")
    }
];

function ListingsScreen(props) {
    return (
        <Screen style={styles.screen}>
            <FlatList
                data={listings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({item}) =>
                    <Card
                        title={item.title}
                        subTitle={item.subTitle}
                        image={item.image}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light
    }
});

export default ListingsScreen;
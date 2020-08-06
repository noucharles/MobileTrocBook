import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, RefreshControl, ScrollView} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/card";

import axios from 'axios';
import routes from '../navigation/routes';
import colors from '../config/color';
import Button from "../components/AppButton";
import annoncesApi from "../api/listing";
import AnnonceService from "../api/annonce";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";


function ListingsScreen({navigation}) {

    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    let tabColors = ["#fc5c65"];

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        AnnonceService.findAll()
            .then(response => { setLoading(true); setListings(response.data) ;setLoading(false);setRefreshing(false); setError(false); console.log(response.data)})
            .catch(error => {
                setLoading(false);
                setError(true);
                console.log((error.message))
            });

        //wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
         loadListings();
    }, []);

    function loadListings() {
        AnnonceService.findAll()
            .then(response => { setLoading(true); setListings(response.data) ;setLoading(false); setError(false); console.log(response.data)})
            .catch(error => {
                setLoading(false);
                setError(true);
                console.log((error.message))
            });
    }

    if(!listings) {
        console.log("rien");
    }

    return (
      <>
        <ActivityIndicator visible={loading} />
        <Screen style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={tabColors}/>
                }
            >
            {error && (
                <>
                <AppText>Impossible de récupérer les annonces.</AppText>
                <Button onPress={loadListings} title="Réessayer"/>
            </>
                )}
            {/*<ActivityIndicator visible={true}/>*/}
            <FlatList
                data={listings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({item}) =>
                    <Card
                        title={`${item.title} ${item.category.label}`}
                        subTitle={`${item.district}`}
                        imageUrl={item.images.length ? (`http://192.168.43.11:8000${item.images[0].url}`) : ("https://place-hold.it/300x500/666")}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
            />
            </ScrollView>
        </Screen>
      </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        paddingTop: 20,
        backgroundColor: colors.light
    }
});

export default ListingsScreen;
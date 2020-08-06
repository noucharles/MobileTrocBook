import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    ScrollView,
    Text,
    TouchableWithoutFeedback, Alert
} from "react-native";
import Screen from "../components/Screen";

import routes from '../navigation/routes';
import colors from '../config/color';
import UserService from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";
import AnnonceService from "../api/annonce";
import AppText from "../components/AppText";


function MyListingsScreen({navigation}) {


    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const {user, setUser} = useContext(AuthContext);
    console.log(user);


    useEffect(() => {
        UserService.getUtilisateurLogin(user.id).then(user => setListings(user.annonces));
    }, [user.id]);


    const deleteAd = async (id) => {
        try {
            Alert.alert("Supprimer l'annonce", "Supprimer l'annonce", [
                {text: "Annuler", style: "cancel"},
                {text: "Confirmer", onPress: () => onDeleteAd(id)},
            ]);
            const onDeleteAd = async (id) => {
                await axios.delete(`http://192.168.43.11:8000/api/annonces/${id}`);
                Alert.alert("Annonce supprimé");
                navigation.navigate(routes.ACCOUNT);
            };

        }catch (e) {
            console.log("erreur de suppression", e);
        }
    };

    if(!listings) {
        console.log("rien");
    }

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.screen}>
                {listings.length === 0 && <AppText style={[styles.card, {fontWeight: 'bold', textAlign: 'center',}]}>AUCUNE ANNONCE</AppText>}
                    <FlatList
                        data={listings}
                        keyExtractor={listing => listing.id.toString()}
                        renderItem={({item}) =>
                            <TouchableWithoutFeedback onPress={() => deleteAd(item.id)}>
                                <View style={styles.card}>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.title} numberOfLines={1}>{`${item.title} ${item.category.label}`}</Text>
                                        <Text style={styles.subTitle} numberOfLines={2}>{`${item.district}`}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        paddingTop: 20,
        backgroundColor: colors.light
    },
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden'
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

export default MyListingsScreen;
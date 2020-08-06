import React from 'react';
import {View , Image, StyleSheet, Text, ScrollView} from "react-native";
import AppText from "../components/AppText";

import colors from '../config/color';
import ListItem from "../components/lists/ListItem";
import * as Linking from 'expo-linking';
import Icon from "../components/Icon";
import { SliderBox } from "react-native-image-slider-box";

function ListingDetailsScreen({route}) {

    const listing = route.params;

    let image = [];
    for (let i = 0; i < listing.images.length; i++) {
        image.push(`http://192.168.43.11:8000/${listing.images[0].url}`);
    }

    console.log(listing.images.length);
    return (
        <ScrollView>

            {listing.images && <SliderBox images={image} sliderBoxHeight={350}/>}

            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title} {listing.category.label}</AppText>

                <View style={{flexDirection: "row"}}>
                    <AppText style={styles.subTitle}>{listing.district}</AppText>

                    <View style={[styles.userContainer, {flex: 1, alignItems: "center", flexDirection: "row", marginLeft: 70}]}>
                        <Icon onPress={()=>{Linking.openURL(`tel:${listing.user.phone}`);}} name="phone" backgroundColor={colors.primary} />
                        <View style={{marginRight: 20}}/>
                        <Icon onPress={()=>{Linking.openURL(`sms:${listing.user.phone}`);}} name="message" backgroundColor={colors.primary} />
                        <View style={{marginRight: 20}}/>
                        <Icon onPress={()=>{Linking.openURL(`mailto:${listing.user.email}`);}} name="email-edit" backgroundColor={colors.primary} />
                    </View>
                </View>


                <View style={[styles.userContainer, {marginTop: 0, paddingTop: 0}]}>
                    <ListItem
                        title={listing.user.name}
                        subTitle="5 Annonces"
                        style={{padding: 0, marginLeft: 0, fontWeight: "600"}}
                    />
                </View>

                <View style={styles.userContainer}>
                    <AppText style={{ fontWeight: "400", marginTop: 20}}>Infos sur le livre</AppText>
                    <Text>Ce livre a été publié en {listing.yearParution}. La maison d'édition se nomme {listing.houseEdition}</Text>
                </View>

                <View style={styles.userContainer}>
                    <AppText style={{ fontWeight: "400"}}>Description du livre</AppText>
                    <Text>{listing.description}</Text>
                </View>

                <View style={styles.userContainer}>
                    <AppText style={{ fontWeight: "400"}}>Exigences</AppText>
                    <Text>{listing.exigences}</Text>
                </View>

            </View>

        </ScrollView>
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
        marginVertical: 10,
        marginTop: 0
    }
});

export default ListingDetailsScreen;
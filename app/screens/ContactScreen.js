import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
import colors from "../config/color";

function ContactScreen(props) {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.card}>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={1}>Pensé et réalisé par NOUMANGUE KUINSI Charles</Text>
                    <Text style={styles.subTitle} numberOfLines={3}>Pour tout problémes rencontrés ou informations supplémentaires veuillez nous contacter au 693693748/696829430</Text>
                    <Text style={styles.subTitle1}>Nos Conseils de Sécurité</Text>
                    <Text style={styles.subTitle}>
                        - Ne troquez, sous aucun prétexte, avant d'avoir vu le livre.{"\n"}
                        - N'envoyez jamais d'argent pour « Réserver » un livre.{"\n"}
                        - Vérifiez la qualité du produit avant de troquer.{"\n"}
                        - Ne donnez pas d’informations personnelles (coordonnées bancaires, numéro de carte de crédit ...)
                    </Text>
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
    detailsContainer: {
        padding: 20
    },
    title: {
        marginBottom: 7,
        fontWeight: "bold",
        paddingBottom: 10
    },
    subTitle1: {
        paddingBottom: 15,
        fontWeight: "bold",
    },
    subTitle: {
        paddingBottom: 10
    }
});

export default ContactScreen;
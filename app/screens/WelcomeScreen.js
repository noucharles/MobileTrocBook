import React from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/color";

function WelcomeScreen(props) {
    return (
        <ImageBackground blurRadius={8} style={styles.background} source={require("../assets/background.jpg")}>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo_book.png')}/>
                <Text style={styles.tagline}>Troquez les livres dont vous n'avez pas besoin</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <AppButton title="CONNEXION"/>
                <AppButton title="Insription" color="secondary"/>
            </View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
    buttonsContainer: {
        padding: 20,
        width: "100%"
    },
    tagline: {
        fontSize: 20,
        fontWeight: "200",
        paddingVertical: 20,
        textAlign: 'center'
    }
});

export default WelcomeScreen;
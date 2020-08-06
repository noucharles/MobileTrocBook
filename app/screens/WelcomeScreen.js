import React from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from "react-native";
import AppButton from "../components/AppButton";
import routes from '../navigation/routes';


function WelcomeScreen({navigation}) {
    return (
        <ImageBackground blurRadius={1} style={styles.background} source={require("../assets/lycee.jpg")}>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo_book.png')}/>
                <Text style={styles.tagline}>Troquez les livres dont vous n'avez pas besoin</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <AppButton title="CONNEXION" onPress={() => navigation.navigate(routes.LOGIN)}/>
                <AppButton title="INSCRIPTION" color="secondary" onPress={() => navigation.navigate(routes.REGISTER)}/>
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
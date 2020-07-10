import React from 'react';
import { StyleSheet, Image} from "react-native";
import * as Yup from 'yup';

import Screen from "../components/Screen";
import {AppFormField, AppForm, SubmitButton} from "../components/forms";

const validationSchema = Yup.object().shape({
   email: Yup.string().required("L' email est obligatoire").email("L'email doit être un email valide").label("Email"),
   password: Yup.string().required("Le mot de passe est obligatoire").min(4, "Le mot de passe doit contenir au moins 4 caractères").label("Password"),
});

function LoginScreen(props) {

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/logo_book.png")}
            />

            <AppForm initialValues={{email: '', password: ''}} onSubmit={(values) => console.log(values)} validationSchema={validationSchema}>
                <AppFormField
                    autoCapitalze="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalze="none"
                    autoCorrect={false}
                    icon="lock"
                    keyboardType="password"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Connexion"/>
            </AppForm>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom:20,

    }
});

export default LoginScreen;
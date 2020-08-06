import React , {useState, useContext}from 'react';
import { StyleSheet, Image, AsyncStorage} from "react-native";
import * as Yup from 'yup';
import axios from 'axios';
import jwtDecode from "jwt-decode";

import Screen from "../components/Screen";
import {AppFormField, AppForm, SubmitButton, ErrorMessage} from "../components/forms";
import AnnonceService from "../api/annonce";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";

import {useFormikContext} from "formik";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
   username: Yup.string().required("L' email est obligatoire").email("L'email doit être un email valide").label("Email"),
   password: Yup.string().required("Le mot de passe est obligatoire").min(4, "Le mot de passe doit contenir au moins 4 caractères").label("Password"),
});

function LoginScreen(props) {

    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const handleSubmit = async (data =  {username, password}) => {
        try {
            setLoading(true);
            const token = await axios.post("http://192.168.43.11:8000/api/login_check", data).then(
                response => response.data.token
            );
            AsyncStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            setLoginFailed(false);

            const user = jwtDecode(token);
            authContext.setUser(user);
            AuthStorage.storeToken(token);
            setLoading(false);
            // const annonces = await AnnonceService.findAll();
            // console.log(annonces);
        }catch {
            setLoading(false);
            setLoginFailed(true);
            console.log(error.response);
        }
        console.log(event)
    }

    return (
      <>
          <ActivityIndicator visible={loading} />
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/logo_book.png")}
            />

            <AppForm initialValues={{username: '', password: ''}} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <ErrorMessage
                    error="Email et/ou password invalide."
                    visible={loginFailed}
                />
                <AppFormField
                    autoCapitalze="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="username"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalze="none"
                    autoCorrect={false}
                    icon="lock"
                    keyboardType="default"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Connexion"/>
            </AppForm>

        </Screen>
      </>
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
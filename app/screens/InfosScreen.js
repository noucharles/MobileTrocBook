import React, {useState, useContext, useEffect} from "react";
import {AsyncStorage, StyleSheet} from "react-native";
import * as Yup from "yup";
import axios from "axios";

import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    ErrorMessage
} from "../components/forms";
import useAuth from "../auth/useAuth";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import UserService from "../api/user";
import routes from "../navigation/routes";


const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name"),
    phone: Yup.number().label("phone").min(650000000,"Le numéro de téléphone n'est pas valide").max(699999999,"Le numéro de téléphone n'est pas valide"),
    email: Yup.string().email("L'email doit être un email valide").label("Email"),
});

function InfosScreen({navigation}) {

    const [infos, setInfos] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        UserService.getUtilisateurLogin(user.id).then(user => setInfos(user));
    }, [user.id]);

    const handleSubmit = async (data={name, email, phone}) => {
        try {
            setLoading(true);
            const result = await axios.put(`http://192.168.43.11:8000/api/users/${user.id}`,data);
            console.log(result);
            setLoading(false);
            navigation.navigate(routes.ACCOUNT);

        }catch (error) {
            setLoading(false);
            setError("Une erreur inattendue est apparue.");
            console.log(result);
        }

    }

    console.log('infos',infos)

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.container}>
                <Form
                    initialValues={{ name: infos.name, email: infos.email, phone: infos.phone}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={error} visible={error} />
                    <FormField
                        autoCorrect={false}
                        icon="account"
                        name="name"
                        placeholder={infos.name}
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder={infos.email}
                        textContentType="emailAddress"
                    />
                    <FormField
                        icon="phone"
                        maxLength={9}
                        keyboardType="number-pad"
                        name="phone"
                        placeholder={infos.phone}
                        textContentType="telephoneNumber"
                    />
                    <SubmitButton title="Modifier" />
                </Form>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default InfosScreen;
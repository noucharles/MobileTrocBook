import React, {useState, useContext} from "react";
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


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom ou pseudo est obligatoire").label("Name"),
    phone: Yup.number().required("Le numéro de téléphone est obligatoire").label("phone").min(650000000,"Le unméro de téléphone n'est pas valide").max(699999999,"Le unméro de téléphone n'est pas valide"),
    email: Yup.string().required("L' email est obligatoire").email("L'email doit être un email valide").label("Email"),
    password: Yup.string().required("Le mot de passe est obligatoire").min(4, "Le mot de passe doit contenir au moins 4 caractères").label("Password"),
});

function RegisterScreen() {

    const authContext = useContext(AuthContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (datas = {name, email, phone, password}) => {
      try {
          setLoading(true);
          const result = await axios.post('http://192.168.43.11:8000/api/users',datas);
          console.log(result);

          if(result){
              let log = {
                  username: result.data.email,
                  password: datas.password
              };
              console.log(log)
              const token = await axios.post("http://192.168.43.11:8000/api/login_check", log).then(
                  response => response.data.token
              );
              console.log(token);
              AsyncStorage.setItem("authToken", token);
              axios.defaults.headers["Authorization"] = "Bearer " + token;

              const user = jwtDecode(token);
              authContext.setUser(user);
              AuthStorage.storeToken(token);
              setLoading(false);
          }
      }catch (error) {
          setLoading(false);
          setError("Une erreur inattendue est apparue.");
          console.log(result);
      }

  }

  return (
  <>
      <ActivityIndicator visible={loading} />
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "",phone: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
          <ErrorMessage error={error} visible={error} />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
            icon="phone"
            maxLength={9}
            keyboardType="number-pad"
            name="phone"
            placeholder="Numéro de téléphone"
            textContentType="telephoneNumber"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="S'inscrire" />
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

export default RegisterScreen;

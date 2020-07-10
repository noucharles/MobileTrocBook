import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom ou pseudo est obligatoire").label("Name"),
    phone: Yup.number().required("Le numéro de téléphone est obligatoire").label("phone").min(650000000,"Le unméro de téléphone n'est pas valide").max(699999999,"Le unméro de téléphone n'est pas valide"),
    email: Yup.string().required("L' email est obligatoire").email("L'email doit être un email valide").label("Email"),
    password: Yup.string().required("Le mot de passe est obligatoire").min(4, "Le mot de passe doit contenir au moins 4 caractères").label("Password"),
});

function RegisterScreen() {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "",phone: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;

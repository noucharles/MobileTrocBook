import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Le titre du livre est obligatoire").min(1).label("Title"),
  houseEdition: Yup.string().required("La maison d'édition est obligatoire").min(2, "La maison d'édition doit contenir au moins 2 caractères").label("HouseEdition"),
  description: Yup.string().required("La description est obligatoire").label("Description"),
  yearParution: Yup.number().required("La date de parution du livre est obligatoire").label("YearParution").min(1970, "La date de parution n'est pas valide").max(2022, "La date de parution n'est pas valide"),
  exigences: Yup.string().required("Les exigences sont obligatoire").label("Exigences"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
    { label: "6 éme", value: "6", backgroundColor: 'red' },
    { label: "5 éme", value: "5", backgroundColor: 'orange' },
    { label: "4 éme", value: "4", backgroundColor: 'yellow' },
    { label: "3 éme", value: "3", backgroundColor: 'green' },
    { label: "2 nde", value: "2", backgroundColor: 'blue' },
    { label: "1 er", value: "1", backgroundColor: 'indigo' },
    { label: "Tle", value: "0", backgroundColor: 'purple' },

];

function ListingEditScreen() {
  return (
    <ScrollView style={styles.container}>
      <Form
        initialValues={{
          title: "",
          houseEdition: "",
          description: "",
          yearParution: "",
          exigences: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Titre du livre" />
        <Picker items={categories} name="category"
                // numberOfColumns={3} PickerItemComponent={CategoryPickerItem}
                placeholder="Classe" width="50%"/>
        <FormField
            maxLength={255}
            name="houseEdition"
            placeholder="Veuillez préciser ici la maison d'édition"
        />
        <FormField
            maxLength={4}
            keyboardType="numeric"
            name="yearParution"
            placeholder="Année de parution du livre"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={2}
          placeholder="Veuillez préciser ici l'état du livre et le maximun d'informations possibles sur celui ci"
        />
        <FormField
            maxLength={255}
            multiline
            name="exigences"
            numberOfLines={3}
            placeholder="Veuillez préciser ici les conditions pour lesquels vous etes pret à céder votre livre, ce que vous attendez en retour"
        />
        <SubmitButton title="Publier" />
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25
  },
});
export default ListingEditScreen;

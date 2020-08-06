import React, {useState, useEffect} from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";

import FormImagePicker from "../components/forms/FormImagePicker";
import AnnonceService from "../api/annonce";
import listing from "../api/listing";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre du livre est obligatoire").min(1).label("Title"),
    houseEdition: Yup.string().required("La maison d'édition est obligatoire").min(2, "La maison d'édition doit contenir au moins 2 caractères").label("HouseEdition"),
    description: Yup.string().required("La description est obligatoire").label("Description"),
    yearParution: Yup.number().required("La date de parution du livre est obligatoire").label("YearParution").min(1970, "La date de parution n'est pas valide").max(2022, "La date de parution n'est pas valide"),
    exigences: Yup.string().required("Les exigences sont obligatoire").label("Exigences"),
    district: Yup.string().required("Le quartier sont obligatoire").label("Quartier"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Sélectionnez au moins une image.").max(3, "Le champ d'image doit avoir moins de ou égal à 3 images"),
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

    const [loading, setLoading] = useState(false);
  const handleSubmit = async (datas = {title, houseEdition, description, yearParution, exigences , category, images }, {resetForm}) => {
      try {
          setLoading(true);
          const result = await axios.post('http://192.168.43.11:8000/api/annonces',{"title": datas.title, "houseEdition": datas.houseEdition, "description": datas.description, "category": datas.category, "yearParution": datas.yearParution, "exigences": datas.exigences, "district": datas.district});
              if(result) {
                  console.log(result.data.id);
                  setLoading(true);

                  datas.images.forEach( (image, index) => {
                      console.log(image)
                      let data1 = new FormData();
                      data1.append("file",  {
                          name: "image" + index,
                          type: "image/*",
                          uri: image,
                      });
                      data1.append('annonce', result.data.id);
                      axios({
                          method: 'post',
                          headers: {
                              'Content-Type': 'multipart/form-data',
                          },
                          data: data1,
                          url: 'http://192.168.43.11:8000/api/images'
                      })
                  })
                  setLoading(false);
              }
          setLoading(false);
      }catch (error) {
          setLoading(false);
          console.log(error.response);
      }

      resetForm();
  }

  return (
  <>
      <ActivityIndicator visible={loading} />
    <ScrollView style={styles.container}>
      <Form
        initialValues={{
          title: "",
          houseEdition: "",
          description: "",
          yearParution: "",
          exigences: "",
          category: null,
          images: [],
          district: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Titre du livre" />
        <FormImagePicker name="images" />
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
              name="district"
              numberOfLines={1}
              placeholder="Veuillez préciser ici votre quartier"
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
            numberOfLines={2}
            placeholder="Veuillez préciser ici les conditions pour lesquels vous etes pret à céder votre livre, ce que vous attendez en retour"
        />
        <SubmitButton title="Publier" />
      </Form>
    </ScrollView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop: 10
  },
});
export default ListingEditScreen;

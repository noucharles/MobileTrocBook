import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback, Alert} from "react-native";
import colors from '../config/color';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

/*const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
};*/

function ImageInput({ imageUri, onChangeImage }) {

    useEffect( () => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        const {granted} = await ImagePicker.requestCameraRollPermissionsAsync();
        if(!granted){
            alert("Vous devez pemettre  à l'application d'accéder à l'appareil photo.");
        }
    };

    const handlePress = () => {
        if(!imageUri) selectImage();
        else Alert.alert("Supprimer", "Etes vous sure de vouloir supprimer cette image ?", [
            {text: "Oui", onPress: () => onChangeImage(null)},
            {text: "Non",},
        ])
    };

    const selectImage = async () => {
        try {
            Alert.alert("Selectionnez l'image", "Choisir une image", [
                {text: "Annuler", style: "cancel"},
                {text: "Importer depuis la galerie", onPress: () => onChangeGalery(true)},
                {text: "Prendre la photo", onPress: () => onChangeGalery(false)},
            ]);
            /*const onChangeGalery = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });*/
            const onChangeGalery = async (bool) => {
                if (bool) {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        quality: 0.4,
                        allowsEditing: false

                    });
                    if (!result.cancelled) {
                        onChangeImage(result.uri);
                    }
                } else {
                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        quality: 0.5,
                        allowsEditing: false

                    });
                    if (!result.cancelled) {
                        onChangeImage(result.uri);
                    }
                }
            };


        }catch (e) {
            console.log("erreur de lecture d'une image", e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && (
                    <MaterialCommunityIcons style={styles.icon} color={colors.medium} name="camera" size={40}/>
                )}
                {imageUri !==0 && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        width: 100,
    },
    icon: {
      marginTop: 95
    },
    image: {
        height: "100%",
        width: "100%",
    },
});

export default ImageInput;
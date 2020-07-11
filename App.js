import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, Image, SafeAreaView,Button, Dimensions, StatusBar, Platform, TextInput  } from 'react-native';
import LoginScreen from "./app/screens/LoginScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import Screen from "./app/components/Screen";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";


export default function App() {
  return (
      <Screen>
        <ListingEditScreen/>
      </Screen>
  );
}
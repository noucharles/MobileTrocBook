import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, StatusBar, Platform, TextInput  } from 'react-native';
import LoginScreen from "./app/screens/LoginScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";


export default function App() {

  return (
      <ListingEditScreen/>
  );
}
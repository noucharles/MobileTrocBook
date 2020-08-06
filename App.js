import React, {useState, useEffect, } from 'react';
import jwtDecode from 'jwt-decode';
import AuthApi from './app/api/authApi';
import {AppLoading} from "expo";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, Image, SafeAreaView,Button, Dimensions, StatusBar, Platform, TextInput  } from 'react-native';
import LoginScreen from "./app/screens/LoginScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import Screen from "./app/components/Screen";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {MaterialCommunityIcons} from '@expo/vector-icons';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

const Link = () => {

    const navigation = useNavigation();

    return (
    <Button
        title="click"
        onPress={() => navigation.navigate("TweetsDetails")}
    />
)};

const Tweets = ({navigation}) => (
    <Screen>
        <Text>Tweets</Text>
        <Button
            title="View Tweet"
            onPress={() => navigation.navigate("TweetsDetails", {id: 1})}
        />
    </Screen>
);

const TweetDetails = ({route}) => (
    <Screen>
        <Text>Tweet details {route.params.id}</Text>
    </Screen>
);

const Stack = createStackNavigator();
const FeedNavigator = () => (
    <Stack.Navigator initialRouteName="Tweets"
        screenOptions={{
            headerStyle: {backgroundColor: "dodgerblue"}, headerTintColor: "white"
        }}
    >
        <Stack.Screen name="Tweets" component={Tweets} options={{headerStyle: {backgroundColor: "tomato"}, headerTintColor: "white", headerShown: false }}/>
        <Stack.Screen name="TweetsDetails" component={TweetDetails} options={({route}) => ({title: route.params.id})}/>
    </Stack.Navigator>
);

const AccountNavigator = () => (
    <Screen>
        <Text>
            Account
        </Text>
    </Screen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: "tomato",
            activeTintColor: "white",
            inactiveBackgroundColor: "#eee",
            inactiveTintColor: "black",
        }}
    >
        <Tab.Screen name="Feed"
                    component={FeedNavigator}
                    options={{
                        tabBarIcon: ({size, color}) => <MaterialCommunityIcons name="home" size={size} color={color}/>
                    }}
        />
        <Tab.Screen name="Account" component={AccountNavigator}/>
    </Tab.Navigator>
);

export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated1, setAuthenticated1] = useState(AuthApi.isAuthenticated);

  const restoreUser = async () => {
      const user = await authStorage.getUser();
      if(user) return setUser(user);
  }

  if(!isReady)
      return (
          <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}/>
      );

  return (
      <AuthContext.Provider value={{user, setUser}}>
          <NavigationContainer theme={navigationTheme}>
              {user ? <AppNavigator/> : <AuthNavigator/>}
          </NavigationContainer>
      </AuthContext.Provider>
  );
}
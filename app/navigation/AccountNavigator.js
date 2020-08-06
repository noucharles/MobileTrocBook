import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ContactScreen from "../screens/ContactScreen";
import InfosScreen from "../screens/InfosScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator mode="modal" >
        <Stack.Screen name="Compte" component={AccountScreen} />
        <Stack.Screen name="Mes Annonces" component={MyListingsScreen} />
        <Stack.Screen name="Infos" component={InfosScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
    </Stack.Navigator>
);

export default AccountNavigator;
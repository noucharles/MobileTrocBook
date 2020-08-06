import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FeedNavigator from "./FeedNavigation";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";

import {MaterialCommunityIcons} from '@expo/vector-icons';
import routes from './routes';
import NewListingButton from "./NewListingButton";


const Tab = createBottomTabNavigator();
const AppNavigator = () => (

    <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedNavigator}
                    options={{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" color={color} size={size}/>, tabPress: console.log('nav tab press triggered')}}/>
        <Tab.Screen name="AnnonceEdit" component={ListingEditScreen}
                    options={({navigation}) => ({tabBarButton: () => <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)}/>,  tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="plus-circle" color={color} size={size}/>})}/>
        <Tab.Screen name="Compte" component={AccountNavigator}
                    options={{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="account" color={color} size={size}/>}}/>
    </Tab.Navigator>
);

export default AppNavigator;
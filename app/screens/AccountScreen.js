import React, {useContext} from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from '../config/color';
import Icon from "../components/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import routes from "../navigation/routes";


const menuItems = [
    {
        title: "Mes annonces",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        },
        targetScreen: routes.MY_LISTINGS,
    },
    {
        title: "Mes infos",
        icon: {
            name: "account",
            backgroundColor: colors.secondary
        },
        targetScreen: routes.INFOS,
    },
    {
        title: "Contactez nous",
        icon: {
            name: "email",
            backgroundColor: colors.purple
        },
        targetScreen: routes.CONTACTS,
    }
];

function AccountScreen({navigation}) {

    const {user, setUser} = useContext(AuthContext);

    const handleLogOut = () =>  {
        setUser(null);
        authStorage.removeToken();
    }

    console.log(user)
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.username}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem =>menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem
                title="Déconnexion"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d"/>
                }
                onPress={handleLogOut}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        paddingTop: 10
    },
    container: {
        marginVertical: 10
    }
});

export default AccountScreen;
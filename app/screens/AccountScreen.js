import React from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from '../config/color';
import Icon from "../components/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";


const menuItems = [
    {
        title: "Mes annonces",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        }
    },
    {
        title: "Mes messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        }
    }
];

function AccountScreen(props) {

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title="bastien Kamaha"
                    subTitle="kambastien@gmail.com"
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
                        />
                    }
                />
            </View>
            <ListItem
                title="Déconnexion"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d"/>
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 10
    }
});

export default AccountScreen;
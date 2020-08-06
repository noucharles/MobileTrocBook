import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = "authToken";

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    }catch (error) {
      console.log("erreur de stockage du jeton d'authentification", error);
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    }catch (error) {
        console.log("erreur lors de l'obtention du jeton d'authentification", error);
    }
};

const getUser = async () => {
    const token = await getToken();
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return jwtDecode(token);
        }
        return null;
    }
    return null;
    // return (token) ? jwtDecode(token) : null;
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    }catch (error) {
        console.log("erreur lors de la suppression du jeton d'authentification", error);
    }
}

export default { getUser, removeToken, storeToken}
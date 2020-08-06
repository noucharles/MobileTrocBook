import {AsyncStorage} from "react-native";
import jwtDecode from "jwt-decode";

function isAuthenticated() {
    const token = AsyncStorage.getItem("authToken");

    if(token){
        const {exp : expiration} = jwtDecode(token);
        if(expiration*1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

export default {};
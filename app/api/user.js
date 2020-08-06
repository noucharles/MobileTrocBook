import axios from "axios";

function getUtilisateurLogin(id)  {
    return axios.get(`http://192.168.43.11:8000/api/users/${id}`)
        .then(res => isEmpty(res.data) ? null : res.data)
        .catch(error => handleError(error));
}

function isEmpty(data){
    return Object.keys(data).length === 0;
}

function handleError(error){
    console.error(error);
}

export default {
    getUtilisateurLogin,
};



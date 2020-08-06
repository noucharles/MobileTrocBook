import axios from "axios";

    function findAll() {
        return axios
            .get('http://192.168.43.11:8000/api/annonces?order[id]=desc')
    }

    function postAnnonce(annonce) {
        return axios.post('http://192.168.43.11:8000/api/annonces',annonce);
    }

    function deleteAnnonce(id) {
        return axios.delete('http://192.168.43.11:8000/api/annonces/',id);
    }
    
export default {
    findAll,
    postAnnonce,
    deleteAnnonce
};



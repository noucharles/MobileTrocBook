import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.43.11:8000/api"
})
import axios from "axios";

const API_URL = "https://app.gloconlive.com/api";

const axiosPublic = axios.create({
    baseURL: API_URL,
    headers : {
        'Content-Type': 'application/json'
    }
});

export default axiosPublic;
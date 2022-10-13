import axios from "axios";

const API_URL = "http://glocon-live.katdev.com/api";

export default axiosPublic = axios.create({
    baseURL: API_URL,
    headers : {
        'Content-Type': 'application/json'
    }
});
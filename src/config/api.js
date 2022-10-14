import axios from "axios";
import { localStorageGetItem } from "../hooks/useAsyncStorage";

const API_URL = "http://glocon-live.katdev.com/api";

const authHeader = async () => {
    const data = await localStorageGetItem();
    if (data) {
        let token = data.accessToken;
        return `token: ${token}`;
    } else {
        return '';
    }
}

export const axiosPublic = axios.create({
    baseURL: API_URL,
    headers : {
        'Content-Type': 'application/json'
    }
});

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers : {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
});
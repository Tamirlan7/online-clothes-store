import axios from "axios";
import {API_URL} from "../constants/AppConstants";

const {
    accessToken,
} = JSON.parse(localStorage.getItem('tokens')) ?? {};


export const axiosAdmin = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

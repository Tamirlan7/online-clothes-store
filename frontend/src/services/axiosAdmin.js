import axios from "axios";
import {API_URL, TOKENS} from "../constants/AppConstants";

const {
    accessToken,
} = JSON.parse(localStorage.getItem(TOKENS)) ?? {};


export const axiosAdmin = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

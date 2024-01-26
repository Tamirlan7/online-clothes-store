import axios from "axios";
import {API_URL} from "../constants/AppConstants";

export const axiosClient = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
})

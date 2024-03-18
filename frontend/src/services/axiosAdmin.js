import axios from "axios";
import {API_URL, TOKENS} from "../constants/AppConstants";

export const axiosAdmin = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${(JSON.parse(localStorage.getItem(TOKENS)) ?? {}).accessToken}`
    }
})

axiosAdmin.interceptors.request.use(
    (req) => {
        req.headers = {
            Authorization: `Bearer ${(JSON.parse(localStorage.getItem(TOKENS)) ?? {}).accessToken}`
        }

        return req
    },
    (err) => {
        throw new Error(err)
    }
)

axiosAdmin.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        throw new Error(err)
    }
)


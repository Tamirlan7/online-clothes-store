import axios from "axios";
import {API_URL, TOKENS} from "../constants/AppConstants";
import validateJwt from "../utils/validateJwt";
import userService from "./userService";

const {
    accessToken,
} = JSON.parse(localStorage.getItem(TOKENS)) ?? {};


export const axiosAdmin = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${(JSON.parse(localStorage.getItem(TOKENS)) ?? {}).accessToken}`
    }
})

axiosAdmin.interceptors.request.use(
    (req) => {
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


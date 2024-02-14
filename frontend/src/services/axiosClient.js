import axios from "axios";
import {API_URL} from "../constants/AppConstants";

export const axiosClient = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
})

axiosClient.interceptors.request.use(
    (req) => {
        return req
    },
    (err) => {
        throw new Error(err)
    }
)

axiosClient.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        throw new Error(err)
    }
)

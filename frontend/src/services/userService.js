import {API_URL} from "../constants/AppConstants";
import {axiosClient} from "./axiosClient";

const userService = {}

userService.login = (data) => {
    return axiosClient.post(`${API_URL}/auth/login`, data)
}

userService.refresh = (data) => {
    return axiosClient.post(`${API_URL}/auth/refresh`, data)
}

export default userService
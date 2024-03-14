import {API_URL} from "../constants/AppConstants";
import {axiosClient} from "./axiosClient";
import {axiosAdmin} from "./axiosAdmin";

const userService = {}

userService.login = (data) => {
    return axiosClient.post(`${API_URL}/auth/login`, data)
}

userService.loginViaTelegram = (data) => {
    return axiosClient.post(`https://telegram.org/js/telegram-widget.js?22`, data)
}

userService.refreshToken = (refreshToken) => {
    return axiosClient.post(`${API_URL}/auth/refresh`, {refreshToken})
}

export default userService

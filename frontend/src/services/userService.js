import {API_URL} from "../constants/AppConstants";
import {axiosClient} from "./axiosClient";

const userService = {}

userService.login = (data) => {
    return axiosClient.post(`${API_URL}/auth/login`, data)
}

userService.refresh = (data) => {
    return axiosClient.post(`${API_URL}/auth/refresh`, data)
}

userService.loginViaTelegram = (data) => {
    return axiosClient.post(`https://telegram.org/js/telegram-widget.js?22`, data)
}

export default userService
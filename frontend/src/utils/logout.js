import {TOKENS} from "../constants/AppConstants";

export default function logout() {
    localStorage.removeItem(TOKENS)
}
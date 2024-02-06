import {TOKENS} from "../constants/AppConstants";

export default function extractJwtPayload() {
    const tokens = JSON.parse(localStorage.getItem(TOKENS))

    if (tokens != null && tokens.accessToken) {
        const encodedPayload = tokens.accessToken.split('.')[1]
        const payload = decodeURIComponent(
            atob(encodedPayload)
                .split("")
                .map( (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(payload)
    }

    return null
}
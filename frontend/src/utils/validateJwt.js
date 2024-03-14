import {TOKENS} from "../constants/AppConstants";
import extractJwtPayload from "./extractJwtPayload";

/*
* returns true if it is valid, otherwise returns false
* */

export default function validateJwt() {
    const {
        accessToken,
    } = JSON.parse(localStorage.getItem(TOKENS)) ?? {}

    if (accessToken) {
        const payload = extractJwtPayload(accessToken);

        if (payload?.exp) {
            // check expiration of the accessToken

            const expInMs = payload.exp * 1000;
            const now = Date.now();

            return now < expInMs;
        }
    }

    return false;
}
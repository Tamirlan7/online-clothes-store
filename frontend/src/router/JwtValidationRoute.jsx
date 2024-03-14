import {TOKENS, UNAUTHENTICATED_ENTRY} from "../constants/AppConstants";
import extractJwtPayload from "../utils/extractJwtPayload";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeShowAuthenticationPopup} from "../slices/userSlice";
import {refreshTokenThunk} from "../thunks/userThunks";
import PageLoader from "../UI/PageLoader/PageLoader";
import validateJwt from "../utils/validateJwt";

function JwtValidationRoute({ children }) {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const {
        accessToken,
        refreshToken,
    } = JSON.parse(localStorage.getItem(TOKENS)) ?? {}
    const { isTokenRefreshing } = useSelector(state => state.user)
    let isExpired = false;

    if (isTokenRefreshing) {
        return <PageLoader />
    }

    if (accessToken) {

        if (validateJwt()) {
            return children
        } else {
            isExpired = true
        }

    }

    if (isExpired && refreshToken) {
        // refresh the tokens

        dispatch(refreshTokenThunk({
            refreshToken,
        }))

        return <PageLoader />
    }

    if (!accessToken && !isExpired) {
        dispatch(changeShowAuthenticationPopup(true))
    }

    return <Navigate to={UNAUTHENTICATED_ENTRY} state={{ redirected: true, from: pathname }} />;
}

export default JwtValidationRoute;
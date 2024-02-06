import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeRoles,
    changeShowAuthenticationPopup,
    changeUserId,
} from '../slices/userSlice';
import extractJwtPayload from '../utils/extractJwtPayload';

const useUserInitialization = () => {
    const [roles, setRoles] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeUser = () => {
            let authenticatedRequired = true;
            const jwtPayload = extractJwtPayload();

            if (jwtPayload?.roles) {
                setRoles(jwtPayload?.roles);
                dispatch(changeRoles(jwtPayload?.roles));
                authenticatedRequired = false;
            }

            if (jwtPayload?.userId) {
                dispatch(changeUserId(jwtPayload.userId));
            }

            dispatch(changeShowAuthenticationPopup(authenticatedRequired));
            setInitialized(true);
        };

        if (!initialized) {
            initializeUser();
        }
    }, [dispatch, initialized]);

    return { roles, loading, initialized };
};

export default useUserInitialization;
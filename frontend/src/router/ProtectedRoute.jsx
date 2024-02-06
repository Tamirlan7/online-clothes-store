import React from 'react';
import {Navigate} from "react-router-dom";
import {UNAUTHENTICATED_ENTRY} from "../constants/AppConstants";
import useUserInitialization from "../hooks/useUserInitialization";


const ProtectedRoute = ({ children, enabledRoles  }) => {
    const { roles, loading, initialized } = useUserInitialization();

    if (loading || !initialized) {
        return <div style={{ fontSize: 32 }}>Загрузка...</div>;
    }

    if (roles.length && enabledRoles.length) {
        const roleContains = roles.some(role => enabledRoles.includes(role));

        if (roleContains) {
            return children;
        }
    }

    return <Navigate to={UNAUTHENTICATED_ENTRY} />;
}

export default ProtectedRoute;

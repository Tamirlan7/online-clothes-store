import React from 'react';


const ProtectedRoute = ({ children, enabledRoles  }) => {

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute;

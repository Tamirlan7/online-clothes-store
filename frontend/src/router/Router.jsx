import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {protectedRoutes, publicRoutes, unauthenticatedRoutes} from './routes';
import AppRoute from "./AppRoute";
import ProtectedRoute from "./ProtectedRoute";


const Router = () => {

    return (
        <Routes>
            {protectedRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <ProtectedRoute enabledRoles={route.enabledRoles}>
                            <AppRoute metaData={route.meta}>
                                {route.component}
                            </AppRoute>
                        </ProtectedRoute>
                    }
                />
            ))}

            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <>
                            <AppRoute metaData={route.meta}>
                                {route.component}
                            </AppRoute>
                        </>
                    }
                />
            ))}

            {unauthenticatedRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <>
                            <AppRoute metaData={route.meta}>
                                {route.component}
                            </AppRoute>
                        </>
                    }
                />
            ))}
        </Routes>
    )
}

export default Router;

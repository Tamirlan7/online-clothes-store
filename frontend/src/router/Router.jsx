import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes, unauthenticatedRoutes } from './routes';


const Router = () => {

    return (
        <Routes>
            {protectedRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <>
                            {route.component}
                        </>
                    }
                />
            ))}

            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <>
                            {route.component}
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
                            {route.component}
                        </>
                    }
                />
            ))}
        </Routes>
    )
}

export default Router;

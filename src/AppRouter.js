import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Callback from './components/Callback';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import { generateAuthUrl } from './helper functions/generateAuthUrl';
import TokenManager from './components/TokenManager';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<TokenManager />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
    </>
));

function AppRouter() {
    const returningFromCallback = window.location.pathname === '/callback';

    useEffect(() => {
        if (!returningFromCallback && window.location.pathname !== '/login') { // you might need to add a few more paths here
            window.location.replace(generateAuthUrl(false));
        }
    }, [returningFromCallback]);

    if (!returningFromCallback && window.location.pathname !== '/login') { // and here
        return null;
    }
    return <RouterProvider router={appRouter} />;
}

export default AppRouter;

import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Callback from './components/Callback';
import ErrorPage from './components/ErrorPage';
import App from './components/App';
import Login from './components/Login';
import { generateAuthUrl } from './helper functions/generateAuthUrl';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<App />} >
            <Route path="/callback" element={<Callback />} />
            <Route path="/login" element={<Login />} />
        </Route>
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

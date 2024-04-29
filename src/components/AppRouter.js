import React from 'react';
import Callback from './Callback';
import ErrorPage from './ErrorPage';
import App from '../App';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './Login';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<App />} >
            <Route path="/callback" element={<Callback />} />
            <Route path="/login" element={<Login /> } />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
    </>
    
));

function AppRouter() {
    return (
        <RouterProvider router={appRouter} />
    );
}

export default AppRouter;
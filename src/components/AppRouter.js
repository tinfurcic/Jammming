import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './Callback';
import ErrorPage from './ErrorPage';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/callback" element={<Callback />} />
                <Route path="/error" element={<ErrorPage />} /> {/* I want this to be a separate page!*/}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
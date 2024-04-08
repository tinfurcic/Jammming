import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage () {

    const navigate = useNavigate();

    return (
        <div>
            <h2>Error Page</h2>
            <p>There was an error processing your request.</p>
            <button onClick={() => navigate("/")} >Go Home</button>
        </div>
    );
}

export default ErrorPage;

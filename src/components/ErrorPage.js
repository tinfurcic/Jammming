import React from 'react';
import { useLocation } from 'react-router-dom';
import AccessDeniedError from './AccessDeniedError';
import GenericError from './GenericError';

function ErrorPage () {
    const location = useLocation();
    const params = new URLSearchParams(location.search); // in params, there is only one
    const errorType = params.get('type');

    return errorType === 'access_denied' ? <AccessDeniedError /> : <GenericError />;
}

export default ErrorPage;

import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import getAccessToken from '../helper functions/getAccessToken';
import parseQueryString from '../helper functions/parseQueryString';

function Callback() {
    console.log("Callback rendered")
    const location = useLocation();
    const setAccessToken = useOutletContext();
    const params = parseQueryString(location.search);
    
    useEffect(() => { // Obtaining access token
        const handleCallback = async () => {
            await getAccessToken(setAccessToken, params)
        };

        handleCallback();
    }, [setAccessToken, params]);

    return null;
}

export default Callback;


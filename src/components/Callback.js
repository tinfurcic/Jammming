import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import getAccessToken from '../helper functions/getAccessToken';
import parseQueryString from '../helper functions/parseQueryString';

function Callback() {
    const location = useLocation();
    const [accessTokenData, setAccessTokenData] = useOutletContext();

    const params = parseQueryString(location.search);

    useEffect(() => { // Obtaining access token
        console.log("location.search changed")
        const handleCallback = async () => {
            await getAccessToken(setAccessTokenData, params)
        };

        handleCallback();
    }, [location.search]);

    return null; // No UI
}

export default Callback;


import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import querystring from 'query-string';
import getAccessToken from '../helper functions/getAccessToken';


function Callback() {
    const location = useLocation();
    const [accessTokenData, setAccessTokenData] = useOutletContext();

    const params = querystring.parse(location.search);

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


import { useState, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import querystring from 'query-string';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import getAccessToken from '../helper functions/getAccessToken';


function Callback() {
    const location = useLocation();
    const [accessTokenNew, setAccessTokenNew] = useOutletContext();

    const params = querystring.parse(location.search);

    useEffect(() => { // Obtaining access token
        console.log("location.search changed") // this one only prints sometimes
        const handleCallback = async () => {
            await getAccessToken(setAccessTokenNew, params)
        };

        handleCallback();
    }, [location.search]);


    const [currentUserId, setCurrentUserId] = useState('');

    useEffect(() => { // Getting user ID
        if (accessTokenNew) {
            const getUserId = async () => {
                const userId = await findCurrentUserId(accessTokenNew);
                setCurrentUserId(userId);
            }
            getUserId();
        }
    }, [accessTokenNew]);

    useEffect(() => { // this just prints the current user ID
        if (currentUserId !== '') {
            console.log("Weee! Successfully obtained the CURRENT USER ID after redirecting! Here it comes:")
            console.log(currentUserId);
        }
    }, [currentUserId])

    return null; // No UI
}

export default Callback;


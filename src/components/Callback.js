import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import querystring from 'query-string';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER
const redirect_uri = 'http://localhost:3000/callback';

function Callback() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [accessTokenNew, setAccessTokenNew] = useOutletContext();

//// IMPORTANT
    // Ask user for access when the app starts!

    useEffect(() => { // Obtaining access token
        const handleCallback = async () => {
            const params = querystring.parse(location.search); 
            const { code, state } = params;

            if (code) {
          /*      // Compare the received state with the expected state
                const expectedState = localStorage.getItem('state');
                if (state !== expectedState) {
                    console.error('State mismatch');
                    navigate('/error');
                    return;
                }  */

                const tokenParameters = { 
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code',
                };

                const authHeader = `Basic ${btoa(`${client_id}:${client_secret}`)}`;
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': authHeader,
                    },
                    body: querystring.stringify(tokenParameters),
                });

                if (tokenResponse.ok) {
                    const tokenData = await tokenResponse.json();
                    console.log("Weee! Successfully obtained the ACCESS TOKEN after redirecting! Here it comes:");
                    console.log(tokenData.access_token); // debugging
                    console.log("Note: you can get the refresh token here as well!");
                    // console.log("token_type: " + tokenData.token_type)
                    // console.log("scope: " + tokenData.scope)
                    // console.log("expires_in: " + tokenData.expires_in)
                    // console.log("refresh_token: " + tokenData.refresh_token)
                    setAccessTokenNew(tokenData.access_token);
                } else {
                    console.error('Failed to exchange authorization code for access token');         
                }
            } else {
                console.error('Missing code parameter');
            }
        };

        handleCallback();
    }, [location.search]);

    const [currentUserId, setCurrentUserId] = useState('');

    useEffect(() => { // Getting user ID
        if (accessTokenNew !== '') {
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


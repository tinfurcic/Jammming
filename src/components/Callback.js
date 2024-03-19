import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import querystring from 'query-string';

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER
const redirect_uri = 'http://localhost:3000/callback';

function Callback() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [accessTokenNew, setAccessTokenNew] = useState('');

    useEffect(() => { // 
        const handleCallback = async () => {
            const params = querystring.parse(location.search); 
            const { code, state } = params;

            if (code) {
                // Compare the received state with the expected state
                const expectedState = localStorage.getItem('state');
                if (state !== expectedState) {
                    console.error('State mismatch');
                    navigate('/error');
                    return;
                }

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
                    console.log('Access Token: ' + tokenData.access_token); // debugging
                    // console.log("token_type: " + tokenData.token_type)
                    // console.log("scope: " + tokenData.scope)
                    // console.log("expires_in: " + tokenData.expires_in)
                    // console.log("refresh_token: " + tokenData.refresh_token)
                    setAccessTokenNew(tokenData.access_token);
                    //////////// Here something like isAuthorized(true);
             //       navigate("/");    // Do I need this?
                } else {
                    console.error('Failed to exchange authorization code for access token');         
                }
            } else {
                console.error('Missing code parameter');
                // here, I don't want to navigate to an error page.
            }
        };

        handleCallback();
    }, [location.search, navigate]);

    useEffect(() => {
        const findCurrentUserId = async () => {
            const currentUserIdResponse = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {  
                    'Authorization': 'Bearer ' + accessTokenNew
                }
            });
            if (currentUserIdResponse.ok) {
                const currentUserIdData = await currentUserIdResponse.json();
                console.log('Current user ID: ' + currentUserIdData.id); // debugging
            } else {
                console.error('Failed to get current user id.');
            }
        }

        if (accessTokenNew !== '') {
            // console.log("Now that access token is obtained, we try to make API calls..."); // debugging
            findCurrentUserId();
        }
    }, [accessTokenNew]);

    return null; // No UI
}

export default Callback;


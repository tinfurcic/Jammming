import React from 'react';
import { generateRandomString } from '../helper functions/generateRandomString';

const client_id = '828454fbd2c14ce993f835d9a85ddc23'; // CHANGE LATER
const redirect_uri = 'http://localhost:3000/callback'; 

function Login() {
    const handleLogin = () => {
        const state = generateRandomString(16); 
        localStorage.setItem('state', state);
        const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read';

        // URLSearchParams takes in a string (a query string is expected) or (in this case) an object
            // (equivalent to a query string), and makes it easy to work with that query string.
                // Below, we only used the .toString() method to get created the query string, but 
        const queryParams = new URLSearchParams({ 
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri, // this is where the app redirects the user after they grant or deny permission.
            state: state
        });
        // We're just following Spotify's guide to creating an authorization URL.
        const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

        window.location.href = authUrl; // Here we navigate to the created URL
    };

    /*
    After clicking the button:
        1. the user logs in
        2. the app obtains the access token
        3. the access token is used to:
            3.1 Get Current User's Profile (response = await fetch(...), then data = response.json(), then read data.id)
            3.2 Using data.id (user_id) and Create Playlist, a playlist is created. Then find data.id again, like above
            3.3 Using data.id (playlist_id), Add Items to Playlist, and an array of track uri's (create one first, from the playlist array of Tracks),
                the chosen tracks are added to the playlist on the user's Spotify account.
    */

    return (
        <div>
            <button onClick={handleLogin}>Save to Spotify</button>
        </div>
    );
}

export default Login;

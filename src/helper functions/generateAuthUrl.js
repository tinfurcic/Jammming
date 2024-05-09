import { generateRandomString } from "./generateRandomString";

const client_id = process.env.REACT_APP_CLIENT_ID;

const redirect_uri = 'https://tfjammming.netlify.app/callback';
//const redirect_uri = 'http://localhost:3000/callback'; 


export function generateAuthUrl () {
    const state = generateRandomString(16);
    localStorage.setItem("state", state);  // This is used to check the expected state in Callback
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read';

    const queryParams = new URLSearchParams({ 
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri, // this is where the app redirects the user after they grant or deny permission.
        state: state
    });

    // We're just following Spotify's guide to creating an authorization URL.
    return `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
}
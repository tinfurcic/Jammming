import { generateRandomString } from "./generateRandomString";

const client_id = '828454fbd2c14ce993f835d9a85ddc23'; // CHANGE LATER
const redirect_uri = 'https://tfjammming.netlify.app/callback'; 

export function generateAuthUrl () {
    const state = generateRandomString(16);
    localStorage.setItem('state', state);  // This is used to check the expected state in Callback
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read';

    // URLSearchParams takes in a string (a query string is expected) or (in this case) an object
        // (equivalent to a query string), and makes it easy to work with that query string.
            // Below, we only used the .toString() method to get created the query string
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
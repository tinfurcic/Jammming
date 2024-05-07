import stringifyQueryParams from './stringifyQueryParams';

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER
const redirect_uri = 'https://tfjammming.netlify.app/callback';
//const redirect_uri = 'http://localhost:3000/callback';


async function getAccessToken (setAccessTokenData, params) {
    console.log("we got to getAccessToken")
    const { code, state } = params;

    if (code) {
        const expectedState = localStorage.getItem("state");
        if (state !== expectedState) {
            console.error('State mismatch');
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
            body: stringifyQueryParams(tokenParameters),
        });

        if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            console.log("OBTAINING BRAND NEW TOKEN PACKAGE")
            tokenData.expires_in = tokenData.expires_in + Date.now() / 1000;

            console.log("Old package:")
            console.log(localStorage.getItem("tokenData"));
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
            console.log("New package:")
            console.log(localStorage.getItem("tokenData"));

            setAccessTokenData(tokenData);
        } else {
            console.error('Failed to exchange authorization code for access token');         
        }
    } else {
        console.error('Missing code parameter');
    }
}

export default getAccessToken;
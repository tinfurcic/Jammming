import stringifyQueryParams from './stringifyQueryParams';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

const redirect_uri = 'https://tfjammming.netlify.app/callback';
//const redirect_uri = 'http://localhost:3000/callback';


async function getAccessToken (setAccessToken, params) {
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
            const newAccessToken = tokenData.access_token;
            console.log("OBTAINING BRAND NEW TOKEN PACKAGE")
            tokenData.expires_in = tokenData.expires_in + Date.now() / 1000;

            console.log("Old package:")
            console.log(localStorage.getItem("tokenData"));
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
            console.log("New package:")
            console.log(localStorage.getItem("tokenData"));

            setAccessToken(newAccessToken);
        } else {
            console.error('Failed to exchange authorization code for access token');         
        }
    } else {
        console.error('Missing code parameter');
    }
}

export default getAccessToken;
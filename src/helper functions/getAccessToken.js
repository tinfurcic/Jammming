import stringifyQueryParams from './stringifyQueryParams';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

const redirect_uri = 'https://tfjammming.netlify.app/callback';
//const redirect_uri = 'http://localhost:3000/callback';

async function getAccessToken (params) {
    console.log("we got to getAccessToken")
    const { code, state } = params;

    if (code) {
        const expectedState = localStorage.getItem("state");
        if (state !== expectedState) {
            console.error('State mismatch');
            return false;
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
            console.log("OBTAINING BRAND NEW TOKEN PACKAGE");
            tokenData.expires_in = tokenData.expires_in + Date.now() / 1000;
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
            return true;
        } else {
            console.error('Failed to exchange authorization code for access token');
            return false;      
        }
    } else {
        console.error('Missing code parameter');
        return false;
    }
}

export default getAccessToken;
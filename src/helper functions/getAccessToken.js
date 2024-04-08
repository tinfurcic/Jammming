import querystring from 'query-string';


const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER
const redirect_uri = 'http://localhost:3000/callback';

async function getAccessToken (setAccessToken, params) {

    const { code, state } = params;

    if (code) {
        // Compare the received state with the expected state
        const expectedState = localStorage.getItem('state');
        if (state !== expectedState) {
            console.error('State mismatch');
            //navigate('/error');
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
            // console.log("token_type: " + tokenData.token_type)
            // console.log("scope: " + tokenData.scope)

            localStorage.setItem("accessToken", tokenData.access_token);
            localStorage.setItem("accessTokenExpirationTime", parseInt(Date.now() / 1000) + tokenData.expires_in);
            localStorage.setItem("refreshToken", tokenData.refresh_token);

            console.log("After calling getAccessToken, we have:")
            console.log("accessToken: " + tokenData.access_token)
            console.log("accessTokenExpirationTime: " + (parseInt(Date.now() / 1000) + tokenData.expires_in))
            console.log("refreshToken: " + tokenData.refresh_token)

            setAccessToken(tokenData.access_token);

        } else {
            console.error('Failed to exchange authorization code for access token');         
        }
    } else {
        console.error('Missing code parameter');
    }
}

export default getAccessToken;
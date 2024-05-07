//const client_id = process.env.REACT_APP_CLIENT_ID;
//const client_secret = process.env.REACT_APP_CLIENT_SECRET; // CHANGE LATER

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '808bf0952d184a5b84d8db09fe3d374a';

async function refreshAccessToken (setAccessTokenNew, setAccessTokenData) {
    const refreshToken = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
    console.log("Refresh token provided to refreshAccessToken: " + refreshToken);
    const authHeader = `Basic ${btoa(`${client_id}:${client_secret}`)}`;

    const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
        },

        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (refreshResponse.ok) {
        const newTokenData = await refreshResponse.json();
        console.log("REFRESHING ACCESS TOKEN")
        newTokenData.expires_in = newTokenData.expires_in + Date.now() / 1000;

        // There may or may not be a new refresh token in this package. If there isn't one, the old one should be used.
        if (!newTokenData.refresh_token) {
            newTokenData.refresh_token = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
        }

        localStorage.setItem("tokenData", JSON.stringify(newTokenData));
        setAccessTokenData(newTokenData);
        setAccessTokenNew(newTokenData.access_token)
        console.log("Token is successfully refreshed.")

        // this is needed just in Save.js, to have the new access token immediately at ready.
        return newTokenData.access_token;

    } else {
        console.error("An error occurred while trying to refresh the access token.");
        console.log("This is what we have:")
        console.log(localStorage.getItem("tokenData"));

    }
}

export default refreshAccessToken;
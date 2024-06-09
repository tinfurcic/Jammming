const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

async function refreshAccessToken (setAccessToken) {
    const refreshToken = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
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
        newTokenData.expires_in = newTokenData.expires_in * 1000 + Date.now();

        // There may or may not be a new refresh token in this package. If there isn't one, the old one should be used.
        if (!newTokenData.refresh_token) {
            newTokenData.refresh_token = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
        }

        localStorage.setItem("tokenData", JSON.stringify(newTokenData));
        setAccessToken(newTokenData.access_token)
        console.log("Token is successfully refreshed.")

        return newTokenData.access_token;

    } else {
        console.error("An error occurred while trying to refresh the access token.");
        console.log("This is what we have:")
        console.log(localStorage.getItem("tokenData"));

    }
}

export default refreshAccessToken;
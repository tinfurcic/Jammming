const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER

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
        // now the expiration time can be read directly from the package

        // There may or may not be a new refresh token in this package. If there isn't one, the old one should be used.
        if (!newTokenData.refresh_token) {
            newTokenData.refresh_token = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
        }

        localStorage.setItem("tokenData", JSON.stringify(newTokenData));
        setAccessTokenData(newTokenData);
        setAccessTokenNew(newTokenData.access_token)
        console.log("Token is successfully refreshed.")
        // THIS HAPPENS ONCE, AND THEN EVERYTHING BREAKS
    } else {
        console.error("An error occurred while trying to refresh the access token.");
        console.log("This is what we have:")
        console.log(localStorage.getItem("tokenData"));

    }
}

export default refreshAccessToken;
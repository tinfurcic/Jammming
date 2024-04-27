const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER

async function refreshAccessToken () {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    const refreshToken = tokenData.refresh_token;
    const authHeader = `Basic ${btoa(`${client_id}:${client_secret}`)}`;

    const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
        },

        body: new URLSearchParams({ // This works
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (refreshResponse.ok) {
        const newTokenData = await refreshResponse.json();
        console.log("REFRESHING ACCESS TOKEN")
        newTokenData.expires_in = newTokenData.expires_in + Date.now() / 1000;
        // now the expiration time can be read directly from the package

        console.log("old package: ")
        console.log(localStorage.getItem("tokenData"));


        // There may or may not be a new refresh token in this package. If there isn't one, the old one should be used.
        if (!newTokenData.refresh_token) {
            newTokenData.refresh_token = JSON.parse(localStorage.getItem("tokenData")).refresh_token;
        }

        localStorage.setItem("tokenData", JSON.stringify(newTokenData));
        console.log("[refreshAccessToken] Now logging what is saved in localStorage:")
        console.log(localStorage.getItem("tokenData"));
        console.log("... and then what was *meant* to be saved:");
        console.log(JSON.stringify(newTokenData));

        // setTheAccessToken(tokenData.access_token); // this... probably also isn't necessary
            // this won't work, I think. You can try returning it, maybe.

        console.log("Token is successfully refreshed.")
    } else {
        console.error("An error occurred while trying to refresh the access token.");
        // There should be some kind of fallback if this occurs.
        // Add code with which a new access token is obtained, using getAccessToken()
        console.log("Clearing localStorage to trigger fetching a new access token package...");
        console.log("... is commented out.")
        // localStorage.clear(); // this maybe does it
    }
}

export default refreshAccessToken;
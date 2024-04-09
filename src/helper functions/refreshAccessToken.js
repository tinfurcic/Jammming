

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER

async function refreshAccessToken () {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("[In refreshAccessToken] Refresh token: " + refreshToken);
    console.log("[In refreshAccessToken] Refresh token: " + localStorage.getItem("refreshToken"));
    console.log("[In refreshAccessToken] Access token: " + localStorage.getItem("accessToken"));
    console.log("[In refreshAccessToken] Expiration time: ");
    console.log(localStorage.getItem("accessTokenExpirationTime") * 1000);
    console.log(Date.now());
    const authHeader = `Basic ${btoa(`${client_id}:${client_secret}`)}`;

    const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
        },
        /*body: { // This doesn't work
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
        },*/
        body: new URLSearchParams({ // This works
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (refreshResponse.ok) {
        const tokenData = await refreshResponse.json();
        console.log("Token data received in refreshAccessToken:")
        console.log(tokenData);

        localStorage.setItem("accessToken", tokenData.access_token);
        localStorage.setItem("accessTokenExpirationTime", parseInt(Date.now() / 1000) + tokenData.expires_in);
        localStorage.setItem("refreshToken", tokenData.refresh_token);
        // localStorage.setItem("tokenData", tokenData); // you can't do this. Only strings can be saved.

        // setTheAccessToken(tokenData.access_token); // this... probably also isn't necessary

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
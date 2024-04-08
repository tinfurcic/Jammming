

const client_id = '828454fbd2c14ce993f835d9a85ddc23';
const client_secret = '703c6976fc9f48e8a54fd3d988423c5f'; // CHANGE LATER

async function refreshAccessToken () { // you probably want to pass setAccessToken here
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Refresh token: " + refreshToken);
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
        localStorage.setItem("accessToken", tokenData.access_token);
        localStorage.setItem("accessTokenExpirationTime", parseInt(Date.now() / 1000) + tokenData.expires_in);
        localStorage.setItem("refreshToken", tokenData.refresh_token);

        localStorage.setItem("tokenData", tokenData);

        // setTheAccessToken(tokenData.access_token);
        console.log("HOOOORAAAAY! WE ARE REFRESHING TOKENS!!!")
    } else {
        console.error("An error occurred while trying to refresh the access token.");
    }
}

export default refreshAccessToken;
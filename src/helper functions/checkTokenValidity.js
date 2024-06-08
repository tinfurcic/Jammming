import refreshAccessToken from "./refreshAccessToken";

async function checkTokenValidity (accessToken, setAccessToken) {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    const expirationTime = tokenData.expires_in;
    const isExpired = Date.now() / 1000 >= expirationTime;

    let newToken;
    if (isExpired) {
        console.log("The token has expired.");
        newToken = await refreshAccessToken(setAccessToken);
    } else {
        console.log("The access token is still valid.")
        //console.log("The access token should still be valid because the currentTime is");
        //console.log(Date.now() / 1000 + ", which is less than expirationTime, which equals")
        //console.log(expirationTime);
    }
    return newToken || accessToken;
    // Returning the new token ensures that a valid token is available before any other actions that depend on it
        // Unlike the case where we just setAccessToken(toSomething);
};

export default checkTokenValidity;
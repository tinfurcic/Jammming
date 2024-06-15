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
        console.log("The access token is still valid."); // maybe here I should setAccessToken(tokenData.access_token)?
    }
    return newToken || accessToken;
};

export default checkTokenValidity;
import refreshAccessToken from "./refreshAccessToken";

async function manageTokens (setAccessTokenNew, setAccessTokenData) {
    console.log("Starting manageTokens...")

    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    const accTok = tokenData.access_token;
    const expirationTime = tokenData.expires_in;
    const refTok = tokenData.refresh_token;

    if (accTok && expirationTime && refTok) { // checking if we have everything
        console.log("We have a token package saved in localStorage.")
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    
        if (currentTime >= expirationTime) { // here we want to try refreshing it
            console.log("[In manageTokens] The token is expired.");
            await refreshAccessToken(setAccessTokenNew, setAccessTokenData);
        } else { // otherwise, API calls should work. If it doesn't, there is probably a problem with saving or loading token data.
            console.log("[In manageTokens] The token should still be valid because the currentTime is");
            console.log(currentTime + ", which is less than expirationTime, which equals")
            console.log(expirationTime);
        }
    } else { // this shouldn't ever actually execute because missing data should be handled with checkAuthentication() in App.js
        console.log("[In manageTokens] Some token data is missing...")
        console.log("Here's what we have:")
        console.log(JSON.parse(localStorage.getItem("tokenData")));
    }
}

export default manageTokens;
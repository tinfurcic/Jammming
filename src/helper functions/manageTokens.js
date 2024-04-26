import refreshAccessToken from "./refreshAccessToken";

async function manageTokens () {
    console.log("Starting manageTokens...")

    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    console.log("ATTENTION! tokenData in manageTokens:")
    console.log(tokenData);
    const accTok = tokenData.access_token;
    const expirationTime = tokenData.expires_in;
    const refTok = tokenData.refresh_token;

    if (accTok && expirationTime && refTok) { // checking if we have everything
        console.log("We have a token package saved in localStorage.")
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    
        if (currentTime >= expirationTime) { // here we want to try refreshing it
            console.log("[In manageTokens] The token is expired.");
            await refreshAccessToken();
        } else { // otherwise, API calls should work. If it doesn't, there is probably a problem with saving or loading token data.
            console.log("[In manageTokens] The token should still be valid because the currentTime is");
            console.log(currentTime + ", which is less than expirationTime, which equals")
            console.log(expirationTime);
        }
    } else { // this shouldn't ever actually execute because missing data should be handled with checkAuthentication() in App.js
        console.log("[In manageTokens] Some token data is missing...")
        console.log("accTok: " + accTok) //DEBUGGING
        console.log("expirationTime: " + expirationTime) //DEBUGGING
        console.log("refreshToken:" + refTok)
        console.log("That's why we have to redirect...")
        console.log("... but the code for that isn't currently written.");

        // window.location.href = generateAuthUrl(); // careful with this, it should execute only if we're not already redirecting
    }
}

export default manageTokens;
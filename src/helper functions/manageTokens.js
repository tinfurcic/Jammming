import { generateAuthUrl } from "./generateAuthUrl";
import refreshAccessToken from "./refreshAccessToken";

async function manageTokens (isRedirecting, setIsRedirecting) {
    console.log("Starting manageTokens...")
    const authUrl = generateAuthUrl(); // this should probably go in the last 'else' block

    const accTok = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('accessTokenExpirationTime');

    if (accTok && expirationTime) {
        console.log("The currently saved access token is: " + accTok)
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    
        if (currentTime >= expirationTime) {
            console.log("The token is expired.");
            await refreshAccessToken();
            //const flag = await refreshAccessToken(setTheAccessToken, authUrl); //DEBUGGING
            //console.log(flag); //DEBUGGING
    
        } else {
            console.log("The token should still be valid because the currentTime is");
            console.log(currentTime + ", which is less than expirationTime, which equals")
            console.log(expirationTime);
            // Token is not expired, proceed with API calls
            // Use the access token for API calls
        }
    } else {
        console.log("accessToken or expirationTime are missing:")
        console.log("accTok: " + accTok) //DEBUGGING
        console.log("expirationTime: " + expirationTime) //DEBUGGING
        console.log("That's why we have to redirect...")

        setIsRedirecting(true);
        window.location.href = authUrl;
    }
}

export default manageTokens;
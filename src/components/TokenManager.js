import React, { useState, useEffect } from "react";
import checkTokenValidity from '../helper functions/checkTokenValidity';
import refreshAccessToken from '../helper functions/refreshAccessToken';
import App from './App'

function TokenManager () {

    //localStorage.clear(); // debugging
    const [accessToken, setAccessToken] = useState(() => { // for some reason, it works even when I just set it to ("")
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));
        return tokenData ? tokenData.access_token : '';
    });

        useEffect(() => {
            let tokenTimer;
            const refreshToken = async () => {
                console.log("entering refreshToken() in TokenManager")
                await checkTokenValidity (accessToken, setAccessToken);
                const tokenData = JSON.parse(localStorage.getItem("tokenData"));
                const expirationTime = tokenData.expires_in;
                const timeUntilExpiration = expirationTime - Date.now();
                if (timeUntilExpiration > 60000) { // if the token remains valid for more that one minute
                    console.log("Setting timeout...") // set up a timer to refresh it one minute before its expiration
                    tokenTimer = setTimeout(() => refreshAccessToken(setAccessToken), timeUntilExpiration - 60000)
                } else { // otherwise, refresh it immediately
                    console.log("... token was expired, or within a minute of expiring.");
                    await refreshAccessToken(setAccessToken);
                }
            }
            refreshToken();

            return () => {
                clearTimeout(tokenTimer);
            }
        }, [accessToken]);

    return <App accessToken={accessToken} setAccessToken={setAccessToken} />
}

export default TokenManager;
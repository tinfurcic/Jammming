import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';
//import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import checkTokenValidity from '../helper functions/checkTokenValidity';
import refreshAccessToken from '../helper functions/refreshAccessToken';

    // new bug?: removing access to user data doesn't prevent the app from creating new playlists
        // manually redirecting to generateAuthUrl DOES recognize that access is not given, but
            // explicitly denying it in that moment still doesn't prohibit the app to make additional playlists.
        // Can I somehow let the app know that the user revoked access to their data?
            // It looks like I can't do anything but to let the token expire.

    // Things to do:
    // If the `playlist` array is not empty and the user wants to open a new playlist to edit,
        // a warning about lost changes must appear.

    // I desparately need a "clear playlistUnderConstruction" button. ("discard"?)

    // Stretch:
    // Make both columns windows with an "x" in the upper right corner, which closes the window.
    // Next to the "open playlist button", I might also want a "delete playlist" button.
    
function App() {
    //localStorage.clear(); // debugging
    const [isSaving, setIsSaving] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    // prior to this, a token package is definitely retreived, in AppRouter
    useEffect(() => {
        const refreshToken = async () => {
            console.log("entering refreshToken() in App")
            await checkTokenValidity(accessToken, setAccessToken);
            const tokenData = JSON.parse(localStorage.getItem("tokenData"));
            const expirationTime = tokenData.expires_in;
            const timeUntilExpiration = expirationTime - Date.now();
            if (timeUntilExpiration > 60000) { // if the token remains valid for more that one minute
                console.log("Setting timeout...") // set up a timer to refresh it one minute before its expiration
                setTimeout(() => refreshAccessToken(setAccessToken), timeUntilExpiration - 60000)
            } else { // otherwise, refresh it immediately
                console.log("... token was expired, or within a minute of expiring.");
                await refreshAccessToken(setAccessToken);
            }
        }
        refreshToken();
    }, [accessToken]);

    return ( 
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} />
            </div> 
            {<Outlet context={setAccessToken} />}
            {/* This will render <Callback /> when the path is "/callback" */}
        </div>
    );

}

export default App;
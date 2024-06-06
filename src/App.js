import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
//import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import getToken from './helper functions/getToken';
import { generateAuthUrl } from './helper functions/generateAuthUrl';
import checkTokenValidity from './helper functions/checkTokenValidity';

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
    const maybeValidToken = JSON.parse(localStorage.getItem("tokenData")).access_token;

    const [isSaving, setIsSaving] = useState(false);
    const [accessToken, setAccessToken] = useState(maybeValidToken);
    const [accessTokenTemp, setAccessTokenTemp] = useState();
    // I need this for search to work because the expired token doesn't immediately refresh.

    useEffect(() => {
        const getTempToken = async () => {
            const token = await getToken();
            setAccessTokenTemp(token);
        }
        getTempToken();
    }, []);

    useEffect(() => {
        const returningFromCallback = window.location.pathname === '/callback';
        const checkAuthentication = () => {
            const isAuth = localStorage.getItem("tokenData") !== null;
            // returns true if there is any kind of token package saved, which happens the first time a user is authenticated

            if (isAuth) {
                console.log("Authenticated!");
                // check whether the token needs to be refreshed
                const doTheThing = async () => {
                    await checkTokenValidity(accessToken, setAccessToken);
                    // this returns the new access token, but we don't need it immediately
                }
                doTheThing();
            } else {
                console.log("NOT Authenticated!");
                if (!returningFromCallback) {
                    window.location.href = generateAuthUrl();
                }
            }
        };
        checkAuthentication();
    }, [accessToken]);

    return ( 
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessTokenTemp={accessTokenTemp} accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} />
            </div> 
            {<Outlet context={setAccessToken} />}
            {/* This will render <Callback /> when the path is "/callback" */}
        </div>
    );

}

export default App;
import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import manageTokens from './helper functions/manageTokens';
import getToken from './helper functions/getToken';
import { generateAuthUrl } from './helper functions/generateAuthUrl';

    // new bug?: removing access to user data doesn't prevent the app from creating new playlists
        // manually redirecting to generateAuthUrl DOES recognize that access is not given, but
            // explicitly denying it in that moment still doesn't prohibit the app to make additional playlists.
        // Can I somehow let the app know that the user revoked access to their data?
            // It looks like I can't do anything but to let the token expire.

function App() {
    //localStorage.clear(); // debugging

    const [isSaving, setIsSaving] = useState(false);

    const [accessToken, setAccessToken] = useState(); // I need this for search to work because the expired token doesn't immediately refresh.
  
    // I don't really need to keep this in a state. Do I?
    const [accessTokenData, setAccessTokenData] = useState(JSON.parse(localStorage.getItem("tokenData"))); // this is an object!

    // I only need the access token
    const [accessTokenNew, setAccessTokenNew] = useState("");

    // goal for later: as a fallback, make sure that refreshing the page properly reconfigures everything
    useEffect(() => {
        const returningFromCallback = window.location.pathname === '/callback';
        const checkAuthentication = () => {
            const isAuth = localStorage.getItem("tokenData") !== null;
            // returns true if there is any kind of token package saved, which happens the first time a user is authenticated

            if (isAuth) {
                console.log("Authenticated!");
                // check whether the token needs to be refreshed
                const doTheThing = async () => {
                    await manageTokens(setAccessTokenNew, setAccessTokenData);
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
    }, []); // 

    // this is probably unnecessary now
    useEffect(() => { // whenever a token package is updated, update the access token as well.
        if(accessTokenData) {
            setAccessTokenNew(accessTokenData.access_token);
        }
    }, [accessTokenData])


    useEffect(() => {
        const getTempToken = async () => {
            const token = await getToken();
            setAccessToken(token);
        }
        getTempToken();
    }, []);



    return ( 
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header />
            </div>
      
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} accessTokenNew={accessTokenNew} setAccessTokenNew={setAccessTokenNew} setAccessTokenData={setAccessTokenData} isSaving={isSaving} setIsSaving={setIsSaving} />
            </div> 

            <div className={styles.footer}>
                <Footer />
            </div>
            {<Outlet context={setAccessTokenData} />}
            {/* This will render <Callback /> when the path is "/callback" */}
        </div>
    );

}

export default App;
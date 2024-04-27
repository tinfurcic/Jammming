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
    //localStorage.clear();

    const [accessToken, setAccessToken] = useState(); // I need this for search to work because the expired token doesn't immediately refresh.
    // const tokenData = JSON.parse(localStorage.getItem("tokenData")); // I can't do this here
  
    // I don't really need to keep this in a state
    const [accessTokenData, setAccessTokenData] = useState(JSON.parse(localStorage.getItem("tokenData"))); // this is an object!

    // I only need the access token
    const [accessTokenNew, setAccessTokenNew] = useState("");


    // goal for later: as a fallback, make sure that refreshing the page properly reconfigures everything
    useEffect(() => {
        const returningFromCallback = window.location.pathname === '/callback';
        const checkAuthentication = () => {
            console.log("Checking authentication...")
            const isAuth = accessTokenData !== null;
            // returns true if there is any kind of token package saved, which happens the first time a user is authenticated

            // moram osigurati da se if() dio pokrene nakon što se tokenData update-a
                // to se valjda postiže sa accessTokenData dependencyjem
            if (isAuth) {
                // check whether the token needs to be refreshed
                const doTheThing = async () => {
                    await manageTokens(setAccessTokenData);
                    // not sure if this will work as intended
                    // setAccessTokenData(JSON.parse(localStorage.getItem("tokenData")));
                    // setAccessTokenNew(accessTokenData.access_token);
                }
                doTheThing();
            } else {
                if (!returningFromCallback) {
                    window.location.href = generateAuthUrl();
                }
            }
        };
        checkAuthentication();
    }, []); // 

    useEffect(() => { // whenever a token package is updated, update the access token as well.
        setAccessTokenNew(accessTokenData.access_token);
    }, [accessTokenData])


    useEffect(() => { // this will become obsolete
        const getTempToken = async () => {
            const token = await getToken();
            setAccessToken(token);
        }
        getTempToken();
    }, []);



    return ( 
        <div className={styles.App}>
            <div className={styles.header}>
                <Header />
            </div>
      
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} accessTokenNew={accessTokenNew} setAccessTokenData={setAccessTokenData}/>
            </div> 

            <div className={styles.footer}>
                <Footer />
            </div>
            {<Outlet context={[accessTokenData, setAccessTokenData]} />}
            {/* This will render <Callback /> when the path is "/callback" */}
        </div>
    );

}

export default App;
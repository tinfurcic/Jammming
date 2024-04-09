import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import manageTokens from './helper functions/manageTokens';
import getToken from './helper functions/getToken';
import { useNavigate } from 'react-router-dom';
import { generateAuthUrl } from './helper functions/generateAuthUrl';

    // new bug?: removing access to user data doesn't prevent the app from creating new playlists
        // manually redirecting to generateAuthUrl DOES recognize that access is not given, but
            // explicitly denying it in that moment still doesn't prohibit the app to make additional playlists.
        // Can I somehow let the app know that the user revoked access to their data?
            // It looks like I can't do anything but to let the token expire.

function App() {

    //localStorage.clear(); // this causes state mismatch, among other things.

    const [accessToken, setAccessToken] = useState();
    const [accessTokenNew, setAccessTokenNew] = useState(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const isAuthenticated = () => {
        // Check if the user is authenticated (e.g., by checking if there's an access token in localStorage)
        return accessTokenNew !== null;
    };

    // Check if there is nothing written in accessTokenNew (meaning that the user isn't authenticated)
        // AND make sure we're not already at /callback (where the whole token obtaining thing is going on)
            // Then, and only then, redirect
    // goal for later: as a fallback, make sure that refreshing the page properly reconfigures everything
    useEffect(() => {
        const returningFromCallback = window.location.pathname === '/callback';
        const checkAuthentication = () => {
            console.log("Checking authentication...")
            const isAuth = isAuthenticated();
            /* // old, working code
            if (!isAuth && !returningFromCallback) {
                // navigate('/login');
                window.location.href = generateAuthUrl();
            }
            */
            if (isAuth) {
                // check whether the token needs to be refreshed
                const doTheThing = async () => {
                    await manageTokens();
                    // not sure if this will work as intended
                    setAccessTokenNew(localStorage.getItem('accessToken'));
                }
                doTheThing();
            } else {
                if (!returningFromCallback) {
                    // navigate('/login');
                    window.location.href = generateAuthUrl();
                }
            }
        };
        checkAuthentication();
    }, [navigate]); // 


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
                <SearchBar accessToken={accessToken} accessTokenNew={accessTokenNew} />
            </div> 

            <div className={styles.footer}>
                <Footer />
            </div>
            {<Outlet context={[accessTokenNew, setAccessTokenNew]} />}
            {/* This will render <Callback /> when the path is "/callback" */}
        </div>
    );

}

export default App;
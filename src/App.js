import styles from './App.module.css';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import getToken from './helper functions/getToken';
import { Outlet } from 'react-router-dom';
import { generateAuthUrl } from './helper functions/generateAuthUrl';
import manageTokens from './helper functions/manageTokens';

function App() {

    const [accessToken, setAccessToken] = useState('');
    const [accessTokenNew, setAccessTokenNew] = useState('');

    console.log(localStorage.getItem("accessToken"));
    console.log(localStorage.getItem("accessTokenExpirationTime"));
    console.log(localStorage.getItem("refreshToken"));
    // After getAccessToken is called (in Callback), these values check out.

    const [isRedirecting, setIsRedirecting] = useState(false);
    useEffect(() => {
        if (!isRedirecting) {
            async function manage () {
                await manageTokens(isRedirecting, setIsRedirecting)
            }
            manage();
        }
    }, [])
    //// for some reason, refreshToken is sometimes undefined!




    /*
    const isRedirecting = useRef(false);

    useEffect(() => {
        if (!isRedirecting.current) {

        }
    }, [])
    */



























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

/*
Component tree
                               App
                                |
                            SearchBar   
                          /           \
              SearchResults             Playlist
            /     |       \            /    |    \
        Track    ...     Track     Track   ...   Track
*/

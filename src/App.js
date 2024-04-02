import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import getToken from './helper functions/getToken';
import { Outlet } from 'react-router-dom';

function App() {
    const [accessToken, setAccessToken] = useState('');
    const [accessTokenNew, setAccessTokenNew] = useState('');

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await getToken();
            setAccessToken(token);
        }
        getAccessToken();
    }, []);

    useEffect(() => {
        if (accessTokenNew !== '') {
            console.log("Access token in App: " + accessTokenNew);
        }
    }, [accessTokenNew])

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

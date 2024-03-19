import styles from './App.module.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import getToken from './helper functions/getToken';
import AppRouter from './components/AppRouter';

// [API endpoints] I need Create Playlist and Add Items to Playlist

function App() {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await getToken();
            setAccessToken(token);
        }
        getAccessToken();
    }, []);

    return ( 
        <div className={styles.App}>
            <div className={styles.header}>
                <Header />
            </div>
      
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} />
            </div> 

            <div className={styles.footer}>
                <Footer />
            </div>
            <div>
                <AppRouter />
            </div>
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

import styles from './App.module.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';
//import Footer from './components/Footer';

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
    
function App({accessToken, setAccessToken}) {
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header accessToken={accessToken} />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} />
            </div> 
        </div>
    );

}

export default App;
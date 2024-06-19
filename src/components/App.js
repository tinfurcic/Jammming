import styles from './App.module.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';

    // Things to do:
    // If the `playlist` array is not empty and the user wants to open a new playlist to edit,
        // a warning about lost changes must appear.
    
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
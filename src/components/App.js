import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';

    // Things to do:
    // If the `playlist` array is not empty and the user wants to open a new playlist to edit,
        // a warning about lost changes must appear.
    
function App({accessToken, setAccessToken}) {
    const [isSaving, setIsSaving] = useState(false);
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 320);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth <= 320);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header accessToken={accessToken} isScreenSmall={isScreenSmall} />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} isScreenSmall={isScreenSmall} />
            </div> 
        </div>
    );

}

export default App;
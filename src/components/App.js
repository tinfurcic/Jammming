import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';
    
function App({accessToken, setAccessToken}) {
    const [isSaving, setIsSaving] = useState(false);
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 320);
    const [isScreenSmartphony, setIsScreenSmartphony] = useState(window.innerWidth <= 480 && window.innerWidth > 320);
    const [isScreenMedium, setIsScreenMedium] = useState(window.innerWidth <= 768 && window.innerWidth > 480);
    const [isPushedOut, setIsPushedOut] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth <= 320);
            setIsScreenSmartphony(window.innerWidth <= 480 && window.innerWidth > 320);
            setIsScreenMedium(window.innerWidth <= 768 && window.innerWidth > 480);
        };
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${styles.App} ${isSaving ? styles.saving : ''}`}>
            <div className={styles.header}>
                <Header accessToken={accessToken} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isPushedOut={isPushedOut} setIsPushedOut={setIsPushedOut} />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenMedium={isScreenMedium} isPushedOut={isPushedOut} setIsPushedOut={setIsPushedOut} />
            </div> 
        </div>
    );

}

export default App;
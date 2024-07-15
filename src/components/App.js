import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';
import getCurrentUserData from '../helper functions/getCurrentUserData';
    
function App({accessToken, setAccessToken}) {
    const [isSaving, setIsSaving] = useState(false);
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 320);
    const [isScreenSmartphony, setIsScreenSmartphony] = useState(window.innerWidth <= 480 && window.innerWidth > 320);
    const [isScreenMedium, setIsScreenMedium] = useState(window.innerWidth <= 768 && window.innerWidth > 480);
    const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
    const [isPushedOut, setIsPushedOut] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const getUserData = async () => {
            try {
                const data = await getCurrentUserData(accessToken);
                if (isMounted) {
                    setUserData(data);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        if (accessToken) {
            getUserData();
        }
        return () => {
            isMounted = false;
        }
    }, [accessToken, setUserData]);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth <= 320);
            setIsScreenSmartphony(window.innerWidth <= 480 && window.innerWidth > 320);
            setIsScreenMedium(window.innerWidth <= 768 && window.innerWidth > 480);
            setIsScreenLarge(window.innerWidth <= 1024 && window.innerWidth > 768);
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
                <Header accessToken={accessToken} userData={userData} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isPushedOut={isPushedOut} setIsPushedOut={setIsPushedOut} />
            </div>
            <div className={styles.searchBar}>
                <SearchBar accessToken={accessToken} setAccessToken={setAccessToken} userData={userData} isSaving={isSaving} setIsSaving={setIsSaving} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenMedium={isScreenMedium} isScreenLarge={isScreenLarge} isPushedOut={isPushedOut} setIsPushedOut={setIsPushedOut} />
            </div> 
        </div>
    );

}

export default App;
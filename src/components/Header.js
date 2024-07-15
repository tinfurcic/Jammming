import React from 'react';
import styles from './Header.module.css';
import Profile from './Profile';

function Header({ accessToken, userData, isScreenSmall, isScreenSmartphony, setIsPushedOut }) {
    return (
        <>
            {!isScreenSmall && !isScreenSmartphony && <div className={`${styles.headerContainer}`}>
                <h1 className={styles.heading}>Jammming</h1>
                <div className={styles.profileContainer}>
                    <Profile userData={userData} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} setIsPushedOut={setIsPushedOut} />
                </div>
            </div>}
        </>
  );
}

export default Header;

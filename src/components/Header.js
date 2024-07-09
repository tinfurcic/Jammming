import React from 'react';
import styles from './Header.module.css';
import Profile from './Profile';

function Header({ accessToken, isScreenSmall }) {
    return (
        <div className={`${styles.headerContainer} ${styles.hiddenOnSmallestScreens}`}>
            <h1 className={styles.heading}>Jammming</h1>
            <div className={styles.profileContainer}>
                <Profile accessToken={accessToken} isScreenSmall={isScreenSmall} setIsPushedOut={() => {}} />
            </div>
        </div>
  );
}

export default Header;

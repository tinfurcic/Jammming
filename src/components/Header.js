import React from 'react';
import styles from './Header.module.css';
import Profile from './Profile';

function Header({accessToken}) {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.heading}>Jammming</h1>
            <div className={styles.profileContainer}>
                <Profile accessToken={accessToken} />
            </div>
        </div>
  );
}

export default Header;

import React from 'react';
import styles from './Header.module.css';
import Profile from './Profile';

function Header({userData, isScreenSmall, isScreenSmartphony, setIsPushedOut }) {

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <>
            {!isScreenSmall && !isScreenSmartphony && <div className={`${styles.headerContainer}`}>
                <h1 className={styles.heading} onClick={handleClick} >Jammming</h1>
                <div className={styles.profileContainer}>
                    <Profile userData={userData} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} setIsPushedOut={setIsPushedOut} />
                </div>
            </div>}
        </>
  );
}

export default Header;

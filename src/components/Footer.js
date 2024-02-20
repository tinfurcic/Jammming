import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.stuff}>Some small text here...</p>
      <p className={styles.otherStuff}>...or maybe some small text there</p>
    </div>
  );
}

export default Footer;

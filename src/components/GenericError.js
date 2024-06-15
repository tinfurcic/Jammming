import React from 'react';
import styles from "./GenericError.module.css";
import { generateAuthUrl } from '../helper functions/generateAuthUrl';

function GenericError () {

    return (
        <div className={styles.genericError} >
            <h2>Ah.</h2>
            <p>Something went wrong. Luckily, there's this convenient button here.</p>
            <button onClick={() => window.location.replace(generateAuthUrl(true))} >Convenient button</button>
        </div>
    );
}

export default GenericError;

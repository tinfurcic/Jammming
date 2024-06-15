import React from "react";
import styles from "./AccessDeniedError.module.css";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function AccessDeniedError () {

    return (
        <div className={styles.accessDeniedError}>
            <p>We're really sorry, but the app can't work without access to some of your data.</p>
            <button onClick={() => window.location.replace(generateAuthUrl(true))} ><span>Fine. What do you need, again?</span></button>
        </div>
    )
}

export default AccessDeniedError;
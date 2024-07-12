import React, { useState, useEffect } from "react";
import styles from "./AccessDeniedError.module.css";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function AccessDeniedError () {

    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 320);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth <= 320);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.accessDeniedError}>
            <p>We're really sorry, but the app can't work without access to some of your data.</p>
            <button onClick={() => window.location.replace(generateAuthUrl(true))} >
                <span>{isScreenSmall ? "Fine. Take me back." : "Fine. What do you need, again?"}</span>
            </button>
        </div>
    )
}

export default AccessDeniedError;
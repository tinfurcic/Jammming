import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function Profile({ userData, isScreenSmall, isScreenSmartphony, setIsPushedOut }) {
    const [profileImage, setProfileImage] = useState(null);
    const [displayName, setDisplayName] = useState("");

    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isActive, setIsActive] = useState(false); // This doesn't quite mimic the :active selector

    const profileImageContainerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (isExpanded && (isScreenSmall || isScreenSmartphony)) {
            setIsPushedOut(true);
        } else {
            setIsPushedOut(false);
        }
    }, [isExpanded, isScreenSmall, isScreenSmartphony, setIsPushedOut]);


    useEffect(() => { // I need this to effectively transition the linear gradient. Doesn't work in firefox, for now.
        try {
            CSS.registerProperty({
                name: '--ending-percentage',
                syntax: '<percentage>',
                inherits: false,
                initialValue: '90%',
            });
            CSS.registerProperty({
                name: '--starting-length',
                syntax: '<length>',
                inherits: false,
                initialValue: '50px',
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const buttonElement = buttonRef.current;
        if (buttonElement) {
            if (isActive && buttonElement.classList.contains(styles.expanded) && buttonElement.classList.contains(styles.noLeftBorder)) {
                buttonElement.style.setProperty('--ending-percentage', '0%');
                buttonElement.style.setProperty('--starting-length', '0');
            } else {
                buttonElement.style.setProperty('--ending-percentage', '90%');
                buttonElement.style.setProperty('--starting-length', '50px');
            }
        } else {
            console.error("buttonElement is null");
        }
    }, [isActive]);

    const handleMouseDown = () => {
        setIsActive(true);
    }

    const handleMouseUp = () => {
        setIsActive(false);
    }

    const handleMouseOverImage = () => {
        setIsImageHovered(true);
        setIsActive(false);
    };

    const handleMouseOutImage = () => {
        setIsImageHovered(false);
    };

    const handleMouseOverButton = () => {
        if (isImageHovered || isExpanded) { // this is here just because firefox has a problem with border-radius
            setIsButtonHovered(true);
        }
      };

    const handleMouseOutButton = () => {
        setIsButtonHovered(false);
        setIsActive(false);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (userData) {
                if (userData.images && userData.images.length > 0) {
                    setProfileImage(userData.images[userData.images.length - 1].url);
                } else if (userData.display_name) {
                    setDisplayName(userData.display_name);
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [userData]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    const switchAccount = (event) => {
        const profileImageContainer = profileImageContainerRef.current;
        if (!profileImageContainer.contains(event.target) && isExpanded) { // isExpanded here because of firefox and border-radius
            window.location.replace(generateAuthUrl(true));
        }
    }

    return (
        <button ref={buttonRef} className={`${styles.profileButton} ${isExpanded ? styles.expanded : styles.shrunk} ${isButtonHovered && !isImageHovered && isExpanded ? styles.noLeftBorder : ''}`} onClick={switchAccount} onMouseOver={handleMouseOverButton} onMouseOut={handleMouseOutButton} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div ref={profileImageContainerRef} className={`${styles.profileImageContainer} ${isExpanded ? styles.pushed : ""}`} onClick={toggleExpansion} onMouseOver={handleMouseOverImage} onMouseOut={handleMouseOutImage} > {/* you can add ${profileImage ? styles.hasImage : styles.noImage} */}
                {profileImage ? (
                    <img className={styles.profileImage} src={profileImage} alt="Profile" />
                    ) : (
                    <span className={styles.displayName}>{displayName.charAt(0)}</span>
                )}
            </div>
            <div className={styles.textContainer} >
                <span className={styles.logoutText}>Switch account</span>
            </div>
        </button>
    );
}

export default Profile;

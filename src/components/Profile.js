import React, { useEffect, useRef, useState } from "react";
import getCurrentUserData from "../helper functions/getCurrentUserData";
import styles from "./Profile.module.css";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function Profile({ accessToken }) {
    const [profileImage, setProfileImage] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const profileImageContainerRef = useRef(null);

    const handleMouseOverImage = () => {
        setIsImageHovered(true);
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
    };

    useEffect(() => {
        async function getUserData() {
            try {
                const userData = await getCurrentUserData(accessToken);
                if (userData.images && userData.images.length > 0) {
                    setProfileImage(userData.images[userData.images.length - 1].url);
                }
                setDisplayName(userData.display_name);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        getUserData();
    }, [accessToken]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    const switchAccount = (event) => {
        const profileImageContainer = profileImageContainerRef.current;
        if (!profileImageContainer.contains(event.target)) {
            window.location.replace(generateAuthUrl(true));
        }
    }

    return (
        // welcome to the jungle
        <button className={`${styles.profileButton} ${isExpanded ? styles.expanded : styles.shrunk} ${isButtonHovered && !isImageHovered ? styles.noLeftBorder : ''}`}onClick={switchAccount} onMouseOver={handleMouseOverButton} onMouseOut={handleMouseOutButton} >
            <div className={`${styles.profileImageContainer} ${isExpanded ? styles.imageContainerExpanded : ''}`} onClick={toggleExpansion} onMouseOver={handleMouseOverImage} onMouseOut={handleMouseOutImage} ref={profileImageContainerRef} >
                {profileImage ? (
                    <img className={styles.profileImage} src={profileImage} alt="Profile" />
                    ) : (
                    <span className={styles.displayName}>{displayName.charAt(0)}</span>
                )}
            </div>
            {isExpanded && <span className={styles.logoutText}>Switch account</span>}

        </button>
    );
}

export default Profile;

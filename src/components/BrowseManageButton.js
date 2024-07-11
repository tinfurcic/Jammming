import React from "react";
import styles from "./BrowseManageButton.module.css";
import searchTracks from "../helper functions/searchTracks";

function BrowseManageButton ({ accessToken, isBrowsing, setIsBrowsing, isManaging, setIsManaging, setResults, setSearchText, setShowUsersPlaylists }) {

    const switchToBrowsing = () => {
        setIsBrowsing(true);
        setIsManaging(false);
    }

    const switchToManaging = () => {
        setIsManaging(true);
        setIsBrowsing(false);
    }

    const handleChange = (event) => {
        const searchString = event.target.value
        setSearchText(searchString);
        setShowUsersPlaylists(false);
        searchTracks(searchString, setResults, accessToken);
    }

    return (
        <div className={`${styles.buttonContainer}`}>
            <input className={`${styles.browse} ${isBrowsing ? styles.active : ""}`} placeholder={"Search tracks..."} onChange={handleChange} onMouseDown={switchToBrowsing} onTouchStart={switchToBrowsing} />
            <button className={`${styles.manage} ${isManaging ? styles.active : ""}`} onMouseDown={switchToManaging} onTouchStart={switchToManaging}>
                Manage
            </button>
        </div>
    );
}

export default BrowseManageButton;
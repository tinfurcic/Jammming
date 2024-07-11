import React, { useState } from "react";
import styles from "./BrowseManageButton.module.css";
import searchTracks from "../helper functions/searchTracks";

function BrowseManageButton ({ accessToken, isBrowsing, setIsBrowsing, isManaging, setIsManaging, setResults, searchText, setSearchText, setShowUsersPlaylists }) {

    const [placeholder, setPlaceholder] = useState("Search tracks...");

    const switchToBrowsing = () => {
        setIsBrowsing(true);
        setIsManaging(false);
    }

    const switchToManaging = () => {
        setIsManaging(true);
        setIsBrowsing(false);
        setShowUsersPlaylists(false);
    }

    const handleChange = (event) => {
        const searchString = event.target.value
        setSearchText(searchString);
        setShowUsersPlaylists(false);
        searchTracks(searchString, setResults, accessToken);
    }

    const handleFocus = () => {
        setPlaceholder('');
        setIsBrowsing(true);
        setIsManaging(false);
        setShowUsersPlaylists(false);
    }

    const handleBlur = (event) => {
        if (event.target.value === '') {
            setPlaceholder('Search tracks...');
        }
    }

    return (
        <div className={`${styles.buttonContainer}`}>
            <input className={`${styles.browse} ${isBrowsing ? styles.active : ""}`} onChange={handleChange} value={searchText} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} onMouseDown={switchToBrowsing} onTouchStart={switchToBrowsing} />
            <button className={`${styles.manage} ${isManaging ? styles.active : ""}`} onMouseDown={switchToManaging} onTouchStart={switchToManaging}>
                Manage draft
            </button>
        </div>
    );
}

export default BrowseManageButton;
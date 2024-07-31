import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import PlaylistUnderConstruction from './PlaylistUnderConstruction';
import searchTracks from '../helper functions/searchTracks';
import UsersPlaylists from './UsersPlaylists';
import BrowseManageButton from './BrowseManageButton';
import Profile from './Profile';

function SearchBar ({accessToken, setAccessToken, userData, isSaving, setIsSaving, isScreenSmall, isScreenSmartphony, isScreenMedium, isScreenLarge, isPushedOut, setIsPushedOut }) {
    const [searchText, setSearchText] = useState('');
    const [placeholder, setPlaceholder] = useState('Search for tracks...');
    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [showUsersPlaylists, setShowUsersPlaylists] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openedPlaylistId, setOpenedPlaylistId] = useState('');
    const [usersPlaylists, setUsersPlaylists] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState("placeholder fail message");
    const [showFailMessage, setShowFailMessage] = useState(false);
    const [showResults, setShowResults] = useState(false);
    
    const [isBrowsing, setIsBrowsing] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    const [isModified, setIsModified] = useState(false);

    const handleChange = (event) => {
        setIsBrowsing(true);
        setIsManaging(false);
        const searchString = event.target.value;
        setSearchText(searchString);
        setShowUsersPlaylists(false);
        searchTracks(searchString, setResults, accessToken);
    }

    const handleFocus = () => {
        setShowResults(true);
        setShowFailMessage(false);
        setPlaceholder('');
        //handleChange(event);
        setIsBrowsing(true);
        setIsManaging(false);
        setShowUsersPlaylists(false);
    }

    const handleBlur = (event) => {
        if (event.target.value === '') {
            setPlaceholder('Search for tracks...')
        }
    }

    const openUsersPlaylists = () => {
        setShowUsersPlaylists(true); 
        setIsManaging(false);
        setIsBrowsing(true);
    }

    const openDraft = () => {
        setIsManaging(true);
        setIsBrowsing(false);
    }

    useEffect(() => {
        let pairsArray = [];
        for (const track of results) {
            if (JSON.stringify(playlist).includes(JSON.stringify(track.uri)) === true) {
                pairsArray.push(track);
            }
            setPairs(pairsArray);
        }
    }, [results, playlist]);

// on small and smartphony screens, the profile button animation should be changed completely.
    return (
            <div className={styles.mainContainer}>
                <div className={`${styles.browsingTools} ${isPushedOut ? styles.pushRight : ""}`}>
                    {!isPushedOut &&
                        <div className={styles.toolbarButtonContainer}>
                            <button className={styles.toolbarButton} onClick={openUsersPlaylists}>
                                My playlists
                            </button>
                        </div>}
                    {!isScreenSmall && !isScreenSmartphony && <input className={`${styles.searchField}`} id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} />}
                    {!isPushedOut && (isScreenSmall || isScreenSmartphony) && <BrowseManageButton accessToken={accessToken} isBrowsing={isBrowsing} setIsBrowsing={setIsBrowsing} isManaging={isManaging} setIsManaging={setIsManaging} setResults={setResults} searchText={searchText} setSearchText={setSearchText} setShowUsersPlaylists={setShowUsersPlaylists} setShowResults={setShowResults} setShowFailMessage={setShowFailMessage} playlist={playlist} />}
                    {(isScreenSmall || isScreenSmartphony) && <Profile userData={userData} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} setIsPushedOut={setIsPushedOut} />}
                    {isScreenMedium && 
                        <div className={`${styles.toolbarButtonContainer} ${isManaging && (!isPlaylistLoading || playlist.length) === 0 ? styles.hidden : ""}`}>
                            <button className={styles.toolbarButton} onClick={openDraft}>
                                Manage draft
                            </button>
                        </div>}
                </div>
                <div className={styles.listsContainer}>
                    {!isScreenSmall && !isScreenSmartphony && !isScreenMedium ? (
                        <div className={styles.twoLists}>
                            {showUsersPlaylists ? (
                                <div className={styles.firstList}>
                                    <UsersPlaylists accessToken={accessToken} setAccessToken={setAccessToken} userData={userData} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isPlaylistLoading={isPlaylistLoading} setIsPlaylistLoading={setIsPlaylistLoading} isModified={isModified} setIsModified={setIsModified} />
                                </div>
                            ) : (
                                <div className={styles.firstList}>
                                    <SearchResults setPlaylist={setPlaylist} results={results} showResults={showResults} showFailMessage={showFailMessage} failMessage={failMessage} pairs={pairs} setIsModified={setIsModified} isPlaylistLoading={isPlaylistLoading} />
                                </div>
                            )}
                            <div className={styles.secondList}>
                                <PlaylistUnderConstruction userData={userData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} isSaving={isSaving} setIsSaving={setIsSaving} setShowResults={setShowResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setShowUsersPlaylists={setShowUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenLarge={isScreenLarge} pairs={pairs} isPlaylistLoading={isPlaylistLoading} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} setIsModified={setIsModified} setUsersPlaylists={setUsersPlaylists} />                      
                            </div>
                        </div>
                    ) : (
                        <div className={styles.oneList}>
                            {isBrowsing && (
                                showUsersPlaylists ? (
                                    <UsersPlaylists accessToken={accessToken} setAccessToken={setAccessToken} userData={userData} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isPlaylistLoading={isPlaylistLoading} setIsPlaylistLoading={setIsPlaylistLoading} isModified={isModified} setIsModified={setIsModified} />
                                ) : (
                                    <SearchResults setPlaylist={setPlaylist} results={results} showResults={showResults} showFailMessage={showFailMessage} failMessage={failMessage} pairs={pairs} setIsModified={setIsModified} isPlaylistLoading={isPlaylistLoading} />
                                )
                            )}
                            {isManaging && (
                                <PlaylistUnderConstruction userData={userData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} isSaving={isSaving} setIsSaving={setIsSaving} setShowResults={setShowResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setShowUsersPlaylists={setShowUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenLarge={isScreenLarge} pairs={pairs} isPlaylistLoading={isPlaylistLoading} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} setIsModified={setIsModified} setUsersPlaylists={setUsersPlaylists} />
                            )}
                        </div>
                    )}
                </div>
            </div> 
    );
}

export default SearchBar;
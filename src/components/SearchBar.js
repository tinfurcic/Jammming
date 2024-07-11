import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import PlaylistUnderConstruction from './PlaylistUnderConstruction';
import searchTracks from '../helper functions/searchTracks';
import UsersPlaylists from './UsersPlaylists';
import BrowseManageButton from './BrowseManageButton';
import Profile from './Profile';


function SearchBar ({accessToken, setAccessToken, isSaving, setIsSaving, isScreenSmall, isScreenSmartphony, isScreenMedium, isScreenLarge, isPushedOut, setIsPushedOut }) {
    const [searchText, setSearchText] = useState('');
    const [placeholder, setPlaceholder] = useState('Search for tracks...');
    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [showUsersPlaylists, setShowUsersPlaylists] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openedPlaylistId, setOpenedPlaylistId] = useState('');
    const [usersPlaylists, setUsersPlaylists] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState("placeholder fail message");
    const [showFailMessage, setShowFailMessage] = useState(false);
    
    const [isBrowsing, setIsBrowsing] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    const handleChange = (event) => {
        setIsBrowsing(true);
        setIsManaging(false);
        const searchString = event.target.value;
        setSearchText(searchString);
        setShowUsersPlaylists(false);
        searchTracks(searchString, setResults, accessToken);
    }
    const handleFocus = () => {
        setPlaceholder('');
    }
    const handleBlur = (event) => {
        if (event.target.value === '') {
            setPlaceholder('Search for tracks...')
        }
    }
    const toggleUsersPlaylists = () => {
        setShowUsersPlaylists(!showUsersPlaylists);
        if (!isBrowsing) {
            setIsBrowsing(true);
            setShowUsersPlaylists(true);
            setIsManaging(false);
        }
    }

    const openDraft = () => {
        setIsManaging(true);
        setIsBrowsing(false);
    }

// on small and smartphony screens, the profile button animation should be changed completely.
    return (
            <div className={styles.mainContainer}>
                <div className={`${styles.browsingTools} ${isPushedOut ? styles.pushRight : ""}`}>
                    {!isPushedOut &&
                        <div className={styles.toolbarButtonContainer}>
                            <button className={styles.toolbarButton} onClick={toggleUsersPlaylists}>
                                {showUsersPlaylists ? "Search results" : "My playlists"}
                            </button>
                        </div>}
                    {!isScreenSmall && !isScreenSmartphony && <input className={`${styles.searchField}`} id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} />}
                    {!isPushedOut && (isScreenSmall || isScreenSmartphony) && <BrowseManageButton accessToken={accessToken} isBrowsing={isBrowsing} setIsBrowsing={setIsBrowsing} isManaging={isManaging} setIsManaging={setIsManaging} setResults={setResults} setSearchText={setSearchText} setShowUsersPlaylists={setShowUsersPlaylists} />}
                    {(isScreenSmall || isScreenSmartphony) && <Profile accessToken={accessToken} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} setIsPushedOut={setIsPushedOut} />}
                    {isScreenMedium && 
                        <div className={`${styles.toolbarButtonContainer} ${isManaging || playlist.length === 0 ? styles.hidden : ""}`}>
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
                                    <UsersPlaylists accessToken={accessToken} setAccessToken={setAccessToken} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} />
                                </div>
                            ) : (
                                <div className={styles.firstList}>
                                    <SearchResults setPlaylist={setPlaylist} results={results} showFailMessage={showFailMessage} failMessage={failMessage} />
                                </div>
                            )}
                            <div className={styles.secondList}>
                                <PlaylistUnderConstruction playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} isSaving={isSaving} setIsSaving={setIsSaving} setSearchText={setSearchText} setResults={setResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setUsersPlaylists={setUsersPlaylists} setShowUsersPlaylists={setShowUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenLarge={isScreenLarge} />                      
                            </div>
                        </div>
                    ) : (
                        <div className={styles.oneList}>
                            {isBrowsing && (
                                showUsersPlaylists ? (
                                    <UsersPlaylists accessToken={accessToken} setAccessToken={setAccessToken} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} />
                                ) : (
                                    <SearchResults setPlaylist={setPlaylist} results={results} showFailMessage={showFailMessage} failMessage={failMessage} />
                                )
                            )}
                            {isManaging && (
                                <PlaylistUnderConstruction playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} isSaving={isSaving} setIsSaving={setIsSaving} setSearchText={setSearchText} setResults={setResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setUsersPlaylists={setUsersPlaylists} setShowUsersPlaylists={setShowUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenLarge={isScreenLarge} />
                            )}
                        </div>
                    )}
                </div>
            </div> 
    );
}

export default SearchBar;
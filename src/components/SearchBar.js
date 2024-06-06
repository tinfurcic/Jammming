import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import PlaylistUnderConstruction from './PlaylistUnderConstruction';
import searchTracks from '../helper functions/searchTracks';
import UsersPlaylists from './UsersPlaylists';


function SearchBar ({accessTokenTemp, accessToken, setAccessToken, isSaving, setIsSaving}) {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [showUserPlaylists, setShowUserPlaylists] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openedPlaylistId, setOpenedPlaylistId] = useState('');
    const [usersPlaylists, setUsersPlaylists] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);

    const handleChange = (event) => {
        const searchString = event.target.value
        setSearchText(searchString);
        setShowUserPlaylists(false);
        searchTracks(searchString, setResults, accessTokenTemp);
    }

    const handleClick = () => {
        setSearchText("");
        setShowUserPlaylists(true);
    }

    return (
            <div className={styles.searchBarContainer}>
                <div className={styles.browsingTools}>
                    <button className={styles.browseButton} onClick={handleClick}> My playlists </button>
                    <input className={styles.searchField} id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder="Search for tracks..." />
                </div>
                <div className={styles.lists}>
                    {showUserPlaylists ?
                        <UsersPlaylists accessToken={accessToken} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} /> :
                            <SearchResults setPlaylist={setPlaylist} results={results} showFailMessage={showFailMessage} />
                    }
                    <PlaylistUnderConstruction playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} setSearchText={setSearchText} setResults={setResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setUsersPlaylists={setUsersPlaylists} />                        
                </div>
                
            </div> 
    );
}

export default SearchBar;
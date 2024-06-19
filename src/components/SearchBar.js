import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import PlaylistUnderConstruction from './PlaylistUnderConstruction';
import searchTracks from '../helper functions/searchTracks';
import UsersPlaylists from './UsersPlaylists';


function SearchBar ({accessToken, setAccessToken, isSaving, setIsSaving}) {
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

    const handleChange = (event) => {
        const searchString = event.target.value
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
    }

    return (
            <div className={styles.searchBarContainer}>
                <div className={styles.browsingTools}>
                    <button className={styles.browseButton} onClick={toggleUsersPlaylists}>
                        {showUsersPlaylists ? "Search results" : "My playlists"}
                    </button>
                    <input className={styles.searchField} id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className={styles.lists}>
                    {showUsersPlaylists ?
                        <UsersPlaylists accessToken={accessToken} setAccessToken={setAccessToken} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} showFailMessage={showFailMessage} /> :
                            <SearchResults setPlaylist={setPlaylist} results={results} showFailMessage={showFailMessage} failMessage={failMessage} />
                    }
                    <PlaylistUnderConstruction playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} accessToken={accessToken} isSaving={isSaving} setIsSaving={setIsSaving} setSearchText={setSearchText} setResults={setResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setUsersPlaylists={setUsersPlaylists} setShowUsersPlaylists={setShowUsersPlaylists} />                        
                </div>
                
            </div> 
    );
}

export default SearchBar;
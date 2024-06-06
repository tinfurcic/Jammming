import React, { useEffect } from 'react';
import Track from './Track';
import styles from './PlaylistUnderConstruction.module.css';
import Save from './Save';

function PlaylistUnderConstruction ({playlist, setPlaylist, playlistName, setPlaylistName, accessToken, setAccessToken, isSaving, setIsSaving, setSearchText, setResults, showSuccessMessage, setShowSuccessMessage, setShowFailMessage, isEditing, setIsEditing, openedPlaylistId, setUsersPlaylists }) {

    const successMessage = "Saving completed!";

    useEffect (() => { // remove the message if new tracks are added to the playlist
        if (playlist.length !== 0) {
            setShowSuccessMessage(false);
        }
    }, [playlist.length, setShowSuccessMessage]);

    useEffect(() => { // if there are no tracks in the playlist under construction, then we're not really editing anymore.
        if (playlist.length === 0) {
            setIsEditing(false);
            setPlaylistName("");
        }
    }, [playlist.length, setIsEditing, setPlaylistName])

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
            <div className={styles.playlistContainer }>
                {playlist.length === 0 ? (
                    showSuccessMessage ? <div className={styles.message}>{successMessage}</div> : null) :
                        <div className={styles.nameAndSaveContainer}>
                            <input className={styles.nameInput} id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                            <div className={styles.saveButtonContainer}>
                                <Save accessToken={accessToken} setAccessToken={setAccessToken} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} isSaving={isSaving} setIsSaving={setIsSaving} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setSearchText={setSearchText} setResults={setResults} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setUsersPlaylists={setUsersPlaylists} />
                            </div>
                        </div>
                }
                <ul>
                    {playlist.map((track, index) =>
                        <li key={index} >
                            <Track trackInfo={track} setPlaylist={setPlaylist} playlist={playlist} parent="PlaylistUnderConstruction"/>
                        </li>)
                    }
                </ul>
            </div>
    );
}

export default PlaylistUnderConstruction;
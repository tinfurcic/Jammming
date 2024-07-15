import React, { useEffect } from 'react';
import Track from './Track';
import styles from './PlaylistUnderConstruction.module.css';
import Save from './Save';

function PlaylistUnderConstruction ({ userData, playlist, setPlaylist, playlistName, setPlaylistName, accessToken, isSaving, setIsSaving, setShowResults, showSuccessMessage, setShowSuccessMessage, setShowFailMessage, setFailMessage, isEditing, setIsEditing, openedPlaylistId, setShowUsersPlaylists, isScreenSmall, isScreenSmartphony, isScreenLarge, pairs, isPlaylistLoading, setIsBrowsing, setIsManaging }) {

    useEffect (() => {
        if (playlist.length !== 0) {
            setShowSuccessMessage(false);
        }
    }, [playlist.length, setShowSuccessMessage]);

    useEffect(() => {
        if (playlist.length === 0) {
            setIsEditing(false);
            setPlaylistName("");
        }
    }, [playlist.length, setIsEditing, setPlaylistName])

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    const handleDiscard = () => {
        // ask for confirmation
        setPlaylist([]);
        setPlaylistName("");
    }

    return (
            <div className={styles.playlistContainer }>
                {
                isPlaylistLoading ? (
                    <div className={styles.message}>
                        Loading...
                    </div>
                ) : (
                playlist.length === 0 ? (
                    showSuccessMessage ? <div className={styles.message}>Saving completed!</div> : null
                    ) : (
                        <div className={styles.nameAndSaveContainer}>
                            <input className={styles.nameInput} id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                            <div className={`${styles.discardButtonWrapper} ${isScreenSmall || isScreenSmartphony || isScreenLarge ? styles.smallerDiscardButtonWrapper : ""}`}>
                                <button className={styles.discardButton} onClick={handleDiscard}>
                                    {isScreenSmall || isScreenSmartphony || isScreenLarge ? "Discard" : "Discard draft"}
                                </button>
                            </div>
                            <div className={styles.saveButtonContainer}>
                                <Save accessToken={accessToken} userData={userData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} isSaving={isSaving} setIsSaving={setIsSaving} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setFailMessage={setFailMessage} setShowResults={setShowResults} isEditing={isEditing} setIsEditing={setIsEditing} openedPlaylistId={openedPlaylistId} setShowUsersPlaylists={setShowUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} isScreenLarge={isScreenLarge} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} />
                            </div>
                        </div>
                ))
                }
                <ul>
                    {playlist.map((track, index) =>
                        <li key={index} >
                            <Track trackInfo={track} setPlaylist={setPlaylist} playlist={playlist} parent="PlaylistUnderConstruction" pairs={pairs} />
                        </li>)
                    }
                </ul>
            </div>
    );
}

export default PlaylistUnderConstruction;

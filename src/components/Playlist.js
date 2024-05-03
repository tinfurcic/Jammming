import React, { useEffect, useState } from 'react';
import Track from './Track';
import styles from './Playlist.module.css';
import Save from './Save';

function Playlist ({playlist, setPlaylist, accessTokenNew, setAccessTokenNew, setAccessTokenData, isSaving, setIsSaving, setSearchText, setResults, showSuccessMessage, setShowSuccessMessage, setShowFailMessage }) {

    const [playlistName, setPlaylistName] = useState('');



    const successMessage = "Saving completed!";


    useEffect (() => { // remove the message (if it didn't vanish already) if new tracks are added to the playlist
        if (playlist.length !== 0) {
            setShowSuccessMessage(false);
        }
    }, [playlist, setShowSuccessMessage]);

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
            <div className={styles.playlistContainer }>
                {playlist.length === 0 ? (
                    showSuccessMessage ? <div className={styles.message}>{successMessage}</div> : null) :
                        <div className={styles.nameAndSave}>
                            <input id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                            <div className={styles.saveButtonContainer}>
                                <Save accessTokenNew={accessTokenNew} setAccessTokenNew={setAccessTokenNew} setAccessTokenData={setAccessTokenData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} isSaving={isSaving} setIsSaving={setIsSaving} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} setSearchText={setSearchText} setResults={setResults} />
                            </div>
                        </div>
                }
                <ul>
                    {playlist.map((track, index) =>
                    <li key={index} >
                        <Track trackInfo={track} setPlaylist={setPlaylist} playlist={playlist} parent="Playlist"/>
                    </li>)}
                </ul>
            </div>
    );
}

export default Playlist;

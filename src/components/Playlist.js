import React, { useEffect, useState } from 'react';
import Track from './Track';
import styles from './Playlist.module.css';
import Save from './Save';

function Playlist ({playlist, setPlaylist, accessTokenNew, setAccessTokenNew, setAccessTokenData, isSaving, setIsSaving }) {

    const [playlistName, setPlaylistName] = useState('');

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect (() => { // remove the message (if it didn't vanish already) if new tracks are added to the playlist
        if (playlist.length !== 0) {
            setShowMessage(false);
        }
    }, [playlist]);

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
            <div className={styles.playlistContainer }>
                {playlist.length === 0 ? (
                    showMessage ? <div className={styles.message}>{message}</div> : null) :
                        <div className={styles.nameAndSave}>
                            <input id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                            <Save accessTokenNew={accessTokenNew} setAccessTokenNew={setAccessTokenNew} setAccessTokenData={setAccessTokenData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} isSaving={isSaving} setIsSaving={setIsSaving} setMessage={setMessage} setShowMessage={setShowMessage} />
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

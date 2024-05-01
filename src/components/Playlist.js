import React, { useState } from 'react';
import Track from './Track';
import styles from './Playlist.module.css';
import Save from './Save';

function Playlist ({playlist, setPlaylist, accessTokenNew, setAccessTokenNew, setAccessTokenData, setIsSaving }) {

    const [playlistName, setPlaylistName] = useState('');

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
            <div className={styles.playlistContainer }>
                {playlist.length === 0 ?
                null :
                <div className={styles.nameAndSave}>
                    <input id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                    <Save accessTokenNew={accessTokenNew} setAccessTokenNew={setAccessTokenNew} setAccessTokenData={setAccessTokenData} playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} setIsSaving={setIsSaving} />
                </div>}
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

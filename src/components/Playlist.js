import React, { useState } from 'react';
import Track from './Track';
import styles from './Playlist.module.css';

function Playlist ({playlist, setPlaylist}) {

    const [playlistName, setPlaylistName] = useState('');

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    //warning: some code below might be for test purposes only
    return (
            <div className={styles.playlistContainer }>
                {playlist.length === 0 ?
                null :
                <div className={styles.nameAndSave}>
                    <input id="playlistName" type="text" value={playlistName} onChange={handleChange} placeholder='New Playlist'/>
                    <button>Save to Spotify</button>
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

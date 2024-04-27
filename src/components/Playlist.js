import React, { useState } from 'react';
import Track from './Track';
import styles from './Playlist.module.css';
import Save from './Save';

function Playlist ({playlist, setPlaylist, accessTokenNew, setAccessTokenData}) {

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
                    <Save accessTokenNew={accessTokenNew} setAccessTokenData={setAccessTokenData} playlist={playlist} playlistName={playlistName} />
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

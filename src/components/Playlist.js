import React, { useState } from 'react';
import Track from './Track';

// [DESIGN]
    // There will probably be an "addToPlaylist" button in the SearchResults component,
        // and a "removeFromPlaylist" button in the the Playlist component,
            // which will add/remove tracks from the playlist.

function Playlist ({playlist, setPlaylist}) {

    const removeFromPlaylist = (trackURI) => {
        const newPlaylist = playlist.filter((track) => track.uri !== trackURI);
        setPlaylist(newPlaylist);
    }

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    //warning: some code below might be for test purposes only
    return (
            <div>
                <input id="playlistName" type="text" value={playlistName} onChange={handleChange}/>
                <ol>
                    {playlist.map((track, index) =>
                    <li key={index} >
                        <Track trackInfo={track} />
                        <button className='addBtn' onClick={() => removeFromPlaylist(track.uri)} > - </button>
                    </li>)}
                </ol>
                <button>Save to Spotify</button>
            </div>
    );
}

export default Playlist;

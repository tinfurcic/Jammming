import React, { useState } from 'react';

// An instance of this component is initially an empty list,
    // but the user can add Tracks to that list.

// There will probably be an "addToPlaylist" button in the SearchResults component,
    // and a "removeFromPlaylist" button in the the Playlist component,
        // which will add/remove tracks from the playlist.


function Playlist ({list, setList}) {
    // The Playlist should keep track of Tracks as they are added to/removed from it, and immediately display changes.


    // this function will remove a track from a playlist. Might need adjustments in the future.
    const removeFromPlaylist = (trackId) => {
        const newList = list.filter((track) => track.id !== trackId);
        setList(newList);
    }

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const handleChange = (event) => {
        setPlaylistName(event.target.value);
    }

    //warning: some code below might be for test purposes only
    return (
        <>
            <div>
                <input id="playlistName" type="text" value={playlistName} onChange={handleChange}/>
                <ol>
                    {list.map((track, index) => <li key={index} onClick={() => removeFromPlaylist(track.id)}>{track.name}</li>)}
                </ol>
                <button>Save to Spotify</button>
            </div>
        </>
    );
}

export default Playlist;

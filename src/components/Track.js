import React from 'react';

// This component represents a single track.
// It will appear in the SearchResults and in the Playlist.

function Track ({parent}) {

    const song = {
        name: '',
        artist: '',
        album: '',
        id: 10
    } // I guess this is where the API kicks in

    // the button solution is probably too wild, here just as a reminder
    return (
        <>
            <div>
                <h1>{song.name}</h1>
                <h2>{song.artist}|{song.album}</h2>
                {parent === "SearchResults" ? <button className='addBtn'> + </button> : <button className='removeBtn'> - </button>}
            </div>
        </>
    );
}

export default Track;
import React from 'react';

// This component represents a single track.
// It will appear in the SearchResults and in the Playlist.

// A Track card should display the track name, the album the track appears on,
    // and its artists (only most notable, if there were many artists)

// Currently, adding/removing Tracks to/from the Playlist isn't a feature of the Track component itself.
    // Should I pass the addToPlaylist and removeFromPlaylist functions as props instead?

function Track ({trackInfo}) {
    // console.log('trackInfo:', trackInfo); // debugging

// [DESIGN]
    // there might be too many artists to display, so limiting their number to 3 would probably be wise
        // there should also be an upper limit to the length of that string
    return (
            <div>
                <p>{trackInfo.name}</p>
                <span>{trackInfo.artists.map((artist, i) => {
                    if (i !== trackInfo.artists.length - 1) return artist.name + ', ';
                    else return artist.name;
                })} | {trackInfo.album.name}</span>
            </div>
    );
}

export default Track;
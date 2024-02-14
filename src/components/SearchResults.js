import React from 'react';
import Track from './Track';
            
// "Load more" button?

function SearchResults ({setPlaylist, results}) {

    // Is there a better way to find the answer to "Is this track (which is an object) already on the playlist?"?
    const addToPlaylist = (trackToAdd) => {
        setPlaylist((prevPlaylist) => {
            if (JSON.stringify(prevPlaylist).includes(JSON.stringify(trackToAdd)) === false) {
                return [...prevPlaylist, trackToAdd];
            }
            else {
                return prevPlaylist;
            };
        });
    }

    //warning: some code below might be for test purposes only
    return (
            <div>
                <ul>
                    {results.map((result) =>
                    <li key={result.uri}>
                        <Track trackInfo={result} />
                        <button className='addBtn' onClick={() => addToPlaylist(result)} > + </button>
                    </li>)}
                </ul>
            </div>
    );
}

export default SearchResults;
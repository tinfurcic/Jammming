import React from 'react';
import styles from './Track.module.css';

function Track ({trackInfo, setPlaylist, playlist, parent}) {
    // console.log('trackInfo:', trackInfo); // debugging

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

    const removeFromPlaylist = (trackURI) => {
        const newPlaylist = playlist.filter((track) => track.uri !== trackURI);
        setPlaylist(newPlaylist);
    }

    return (
            <div className={styles.trackContainer}>
                <div className={styles.trackInfo}>
                    <h3>{trackInfo.name}</h3>
                    <p>{trackInfo.artists.map((artist, i) => {
                        if (i !== trackInfo.artists.length - 1) return artist.name + ', ';
                        else return artist.name;
                    })} | {trackInfo.album.name}</p>
                </div>
                <div className={styles.button}>
                    {parent === "SearchResults" ?
                    <button className={styles.addBtn} onClick={() => addToPlaylist(trackInfo)} > + </button> :
                    <button className={styles.removeBtn} onClick={() => removeFromPlaylist(trackInfo.uri)} > - </button>}
                </div>
            </div>
    );
}

export default Track;
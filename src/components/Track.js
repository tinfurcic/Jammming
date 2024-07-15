import React from 'react';
import styles from './Track.module.css';
import noPlaylistImage from '../images/no-playlist-image.png';

function Track ({trackInfo, setPlaylist, playlist, parent, pairs}) {

    // Is there a better way to find the answer to "Is this track (which is an object) already on the playlist?"?
    const addToPlaylist = (trackToAdd) => {
        setPlaylist((prevPlaylist) => {
            if (JSON.stringify(prevPlaylist).includes(JSON.stringify(trackToAdd.uri)) === false) {
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
            <div className={`${styles.trackContainer} ${pairs.includes(trackInfo) && parent === "SearchResults" ? styles.grayedOut : ""}`}>
                <div className={styles.trackImage}>
                    <img src = {trackInfo.album.images[2] ? trackInfo.album.images[2].url : noPlaylistImage} alt="Playlist cover" />
                </div>
                <div className={styles.trackInfo}>
                    <h3>{trackInfo.name}</h3>
                    <p>{trackInfo.artists.map((artist, i) => {
                        if (i !== trackInfo.artists.length - 1) return artist.name + ', ';
                        else return artist.name;
                    })} | {trackInfo.album.name}</p>
                </div>
                <div className={`${styles.buttonContainer} ${parent === "SearchResults" ? styles.addButton : styles.removeButton}`}>
                    <button className={styles.button} onClick={parent === "SearchResults" ? () => addToPlaylist(trackInfo) : () => removeFromPlaylist(trackInfo.uri)}>
                        {parent === "SearchResults" ? "Add track" : "Remove track"}
                    </button>
                </div>
            </div>
    );
}

export default Track;
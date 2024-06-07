import React from 'react';
import styles from './Playlist.module.css';
import getPlaylist from '../helper functions/getPlaylist';
import checkTokenValidity from '../helper functions/checkTokenValidity';
import noPlaylistImage from '../images/no-playlist-image.png';
import decodeHtmlEntities from '../helper functions/decodeHtmlEntities';

function Playlist ({accessToken, setAccessToken, playlistInfo, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId}) {

    const openPlaylist = async (playlistInfo) => {
        const theValidToken = await checkTokenValidity(accessToken, setAccessToken);

        setIsEditing(true);
        let playlist = [];
        const getPlaylistArray = await getPlaylist(playlistInfo.id, theValidToken);
        for (const element of getPlaylistArray) {
            playlist.push(element.track);
        }
        setPlaylist(playlist);
        setPlaylistName(playlistInfo.name)
        setOpenedPlaylistId(playlistInfo.id);
    }

    // "Delete playlist" button would be nice as well.

    return (
        <div className={styles.playlistContainer}>
            <div className={styles.playlistImage}>
                <img src = {playlistInfo.images ? playlistInfo.images[0].url : noPlaylistImage} alt="Playlist cover" />
                {console.log(playlistInfo.images)}
            </div>
            <div className={styles.playlistInfo}>
                <h3>{playlistInfo.name}</h3>
                <p>{playlistInfo.description ? decodeHtmlEntities(playlistInfo.description) + " | " : null} {playlistInfo.tracks.total} tracks </p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => openPlaylist(playlistInfo)} > Edit playlist </button>
            </div>
        </div>
    );
}

export default Playlist;
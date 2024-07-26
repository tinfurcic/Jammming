import React, { useState } from 'react';
import styles from './Playlist.module.css';
import getPlaylist from '../helper functions/getPlaylist';
import noPlaylistImage from '../images/no-playlist-image.png';
import decodeHtmlEntities from '../helper functions/decodeHtmlEntities';
import unfollowPlaylist from '../helper functions/unfollowPlaylist';

function Playlist ({accessToken, userData, playlistInfo, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, setIsBrowsing, setIsManaging, usersPlaylists, setUsersPlaylists, isScreenSmall, isScreenSmartphony, setIsPlaylistLoading }) {

    const isOwned = playlistInfo.owner.id === userData.id;

    const openPlaylist = async (playlistInfo) => {
        console.log(isOwned);
        let playlist = [];
        let nextLink = null;
        setPlaylist([]);
        setIsPlaylistLoading(true);
        do {
            const data = await getPlaylist(playlistInfo.id, accessToken, nextLink);
            const tracksArray = data.items;
            for (const element of tracksArray) {
                if (element.track.id === null) { // there might be a better way, but it looks like this avoids errors with addTracksToPlaylist
                    console.log("Skipped track:");
                    console.log(element.track);
                } else {
                    playlist.push(element.track);
                }
            }
            nextLink = data.next;
        } while (nextLink);
        setPlaylist(playlist);
        setIsPlaylistLoading(false);
        setOpenedPlaylistId(playlistInfo.id);
        setIsBrowsing(false);
        setIsManaging(true);
        if (isOwned) {
            setPlaylistName(playlistInfo.name)
            setIsEditing(true);
        } else {
            setPlaylistName("(Owned) copy of " + playlistInfo.name);
            setIsEditing(false);
        }
    }

    const [areYouSure, setAreYouSure] = useState(false); 

    const deletePlaylist = async () => {
        unfollowPlaylist(accessToken, playlistInfo.id);
        setUsersPlaylists(usersPlaylists.filter(playlist => playlist.id !== playlistInfo.id));
    }

    const handleDelete = () => {
        deletePlaylist();
        setAreYouSure(false);
    }

    return (
        <div className={styles.playlistContainer}>
            <div className={styles.playlistImage}>
                <img src = {playlistInfo.images ? playlistInfo.images[0].url : noPlaylistImage} alt="Playlist cover" />
            </div>
            <div className={styles.playlistInfo}>
                <h3>{playlistInfo.name}</h3>
                <p>{playlistInfo.description ? decodeHtmlEntities(playlistInfo.description) + " | " : null} {playlistInfo.tracks.total} tracks </p>
            </div>
            {!areYouSure ? (
                <>
                    <div className={`${styles.buttonContainer} ${styles.delete} ${isScreenSmall || isScreenSmartphony ? styles.small : ""}`}>
                        <button className={styles.button} onClick={() => setAreYouSure(true)} >
                            {isScreenSmall || isScreenSmartphony ? "Delete" : "Delete playlist"}
                        </button>
                    </div>
                    <div className={`${styles.buttonContainer} ${styles.open} ${isScreenSmall || isScreenSmartphony ? styles.small : ""}`}>
                        <button className={styles.button} onClick={() => openPlaylist(playlistInfo)} >
                            {isOwned ? (
                                isScreenSmall || isScreenSmartphony ? "Open" : "Open playlist"
                                ) : (
                                    isScreenSmall || isScreenSmartphony ? "Open" : "Open playlist"
                                )}
                        </button>
                    </div>
                </>
            ) : (
                <div className={`${styles.confirmationContainer} ${isScreenSmall || isScreenSmartphony ? styles.small : ""}`}>
                    <span className={`${isScreenSmall ? styles.wrap : ""}`}>Really delete?</span>
                    <div className={styles.confirmButtonContainer} >
                        <button className={`${styles.button} ${styles.no} `} onClick={() => setAreYouSure(false)} >No</button>
                    </div>
                    <div className={`${styles.confirmButtonContainer}`} >
                        <button className={`${styles.button} ${styles.yes} `} onClick={() => handleDelete()} >Yes</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Playlist;
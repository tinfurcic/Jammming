import React from 'react';
import styles from './Playlist.module.css';
import getPlaylist from '../helper functions/getPlaylist';
import noPlaylistImage from '../images/no-playlist-image.png';
import decodeHtmlEntities from '../helper functions/decodeHtmlEntities';
import unfollowPlaylist from '../helper functions/unfollowPlaylist';

function Playlist ({accessToken, userData, playlistInfo, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, setIsBrowsing, setIsManaging, usersPlaylists, setUsersPlaylists, isScreenSmall, isScreenSmartphony }) {

    const isOwned = playlistInfo.owner.id === userData.id;

    const openPlaylist = async (playlistInfo) => {
        if (isOwned) {
            setIsEditing(true);
        }
        let playlist = [];
        const getPlaylistArray = await getPlaylist(playlistInfo.id, accessToken);
        for (const element of getPlaylistArray) {
            playlist.push(element.track);
        }
        setPlaylist(playlist);
        setPlaylistName(playlistInfo.name)
        setOpenedPlaylistId(playlistInfo.id);
        setIsBrowsing(false);
        setIsManaging(true);
        console.log(playlistInfo);
    }

    const deletePlaylist = async () => {
        unfollowPlaylist(accessToken, playlistInfo.id);
        setUsersPlaylists(usersPlaylists.filter(playlist => playlist.id !== playlistInfo.id));
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
            <div className={`${styles.buttonContainer} ${styles.delete} ${isScreenSmall || isScreenSmartphony ? styles.small : ""}`}>
                <button className={styles.button} onClick={() => deletePlaylist()} >
                    {isScreenSmall || isScreenSmartphony ? "Delete" : "Delete playlist"}
                </button>
            </div>
            <div className={`${styles.buttonContainer} ${isOwned ? styles.edit : styles.copy} ${isScreenSmall || isScreenSmartphony ? styles.small : ""}`}>
                <button className={styles.button} onClick={() => openPlaylist(playlistInfo)} >
                    {isOwned ? (
                        isScreenSmall || isScreenSmartphony ? "Edit" : "Edit playlist"
                        ) : (
                            isScreenSmall || isScreenSmartphony ? "Copy" : "Copy playlist"
                        )}
                    </button>
            </div>
        </div>
    );
}

export default Playlist;
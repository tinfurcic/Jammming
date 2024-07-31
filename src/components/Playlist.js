import React, { useState, useRef } from 'react';
import styles from './Playlist.module.css';
import getPlaylist from '../helper functions/getPlaylist';
import noPlaylistImage from '../images/no-playlist-image.png';
import decodeHtmlEntities from '../helper functions/decodeHtmlEntities';
import unfollowPlaylist from '../helper functions/unfollowPlaylist';
import WarningModal from './WarningModal';

function Playlist ({accessToken, userData, playlistInfo, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, setIsBrowsing, setIsManaging, usersPlaylists, setUsersPlaylists, isScreenSmall, isScreenSmartphony, isPlaylistLoading, setIsPlaylistLoading, isModified, setIsModified }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [areYouSure, setAreYouSure] = useState(false);
    const triggerButtonRef = useRef(null);

    const tryOpening = async () => {
        if (isModified) {
        triggerButtonRef.current = document.activeElement;
        setIsModalOpen(true);
        } else {
            if (!isPlaylistLoading) { // I would actually prefer the old request to be canceled, but I can't get that to work.
                openPlaylist();
            }
        }
    };

    const isOwned = playlistInfo.owner.id === userData.id;

    const openPlaylist = async () => {
        setIsModified(false);
        let playlist = [];
        let nextLink = null;
        setPlaylist([]);
        setIsPlaylistLoading(true);
        setIsBrowsing(false);
        setIsManaging(true);
        do {
            const data = await getPlaylist(playlistInfo.id, accessToken, nextLink);
            const tracksArray = data.items;
            for (const element of tracksArray) {
                if (element.track.id === null) { // there might be a better way, but it looks like this avoids errors with addTracksToPlaylist
                    console.log("This track could not be added to the playlist:");
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
        if (isOwned) {
            setPlaylistName(playlistInfo.name)
            setIsEditing(true);
        } else {
            setPlaylistName("(Owned) copy of " + playlistInfo.name);
            setIsEditing(false);
        }
    }

    const deletePlaylist = async () => {
        unfollowPlaylist(accessToken, playlistInfo.id);
        setUsersPlaylists(usersPlaylists.filter(playlist => playlist.id !== playlistInfo.id));
    }

    const handleDelete = () => {
        deletePlaylist();
        setAreYouSure(false);
    }

    const handleYes = () => {
        openPlaylist();
        setIsModalOpen(false);
        if (triggerButtonRef.current) {
            triggerButtonRef.current.focus();
        }
    };

    const handleNo = () => {
        setIsModalOpen(false);
        if (triggerButtonRef.current) {
            triggerButtonRef.current.focus();
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        if(triggerButtonRef.current) {
            triggerButtonRef.current.focus();
        }
    }

    return (
        <>
        <WarningModal isOpen={isModalOpen} onClose={handleClose} onYes={handleYes} onNo={handleNo} />
        <div className={styles.playlistContainer}>
            <div className={styles.playlistImage}>
                <img src = {playlistInfo.images ? playlistInfo.images[0].url : noPlaylistImage} alt="Playlist cover" />
            </div>
            <div className={styles.playlistInfo}>
                <div className={styles.firstRow} >
                    <h3>{playlistInfo.name}</h3>
                    <span className={styles.ownershipTag} >{isOwned ? "Owned" : "Followed"}</span>
                </div>
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
                        <button className={`${styles.button} ${isPlaylistLoading ? styles.loading : ""}`} onClick={() => tryOpening()} >
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
        </>
    );
}

export default Playlist;
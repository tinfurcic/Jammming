import React from 'react';
import getCurrentUserData from '../helper functions/getCurrentUserData';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import styles from './Save.module.css';
import editPlaylist from '../helper functions/editPlaylist';
import changePlaylistDetails from '../helper functions/changePlaylistDetails';
import unfollowPlaylist from '../helper functions/unfollowPlaylist';
import getUsersPlaylists from '../helper functions/getUsersPlaylists';

function Save({ accessToken, userData, playlist, setPlaylist, playlistName, setPlaylistName, isSaving, setIsSaving, setShowSuccessMessage, setShowFailMessage, setFailMessage, setShowResults, isEditing, setIsEditing, openedPlaylistId, setShowUsersPlaylists, isScreenSmall, isScreenSmartphony, isScreenLarge, setIsBrowsing, setIsManaging, setIsModified, setUsersPlaylists }) {

    // Inconvenient problem: after renaming a playlist, it takes a while for the changes to become visible.
        // I could temporarily save new playlist details and display them until API calls fetch updated playlist details.

    const displayError = () => {
        setShowResults(false);
        setShowFailMessage(true);
        setShowUsersPlaylists(false);
        setIsBrowsing(true);
        setIsManaging(false);
    }

    const displaySuccess = () => {
        setPlaylistName("");
        setPlaylist([]);
        setShowSuccessMessage(true);
        setShowFailMessage(false);
    }    
    const soundTheAlarm = (message) => {
        setIsSaving(false);
        setFailMessage(message);
        displayError();
        console.log("Saving NOT completed. Something went wrong.");
    }

    const loadUsersPlaylists = async () => {
        try {
            let userId;
            if (userData) {
                userId = userData.id;
            }
            const fetchedPlaylists = await getUsersPlaylists(userId, accessToken);
            setUsersPlaylists(fetchedPlaylists);
        }
        catch (error) {
            console.error("Failed to fetch user data", error);
        }
    }
        
    const handleSave = async () => {
        if (isSaving) {
            console.log("Saving is already in motion!")
            return;
        }
        setIsSaving(true);
        try {
            let currentUserId;
            if (userData) {
                currentUserId = userData.id; // faster scenario
            } else {
                currentUserId = await getCurrentUserData(accessToken); // fallback slower scenario
            }
            const playlistId = await createPlaylist(accessToken, currentUserId, playlistName);
            let isCompleted;
            let tempPlaylist = [...playlist];
            while (tempPlaylist.length > 100) {
                isCompleted = await addTracksToPlaylist(accessToken, tempPlaylist.slice(0, 100 - tempPlaylist.length), playlistId);
                if (!isCompleted) {
                    soundTheAlarm("[Save] The list is larger than 100 items. Something went wrong in the while loop.");
                    unfollowPlaylist(accessToken, playlistId);
                    return;
                }   // I also need a safety net in case something goes wrong in the middle of the process.
                    // Also, try to move as much code as you can to addTrackToPlaylist.js 
                tempPlaylist = tempPlaylist.slice(100);
            }
            isCompleted = await addTracksToPlaylist(accessToken, tempPlaylist, playlistId);
            
            if (isCompleted) {
                displaySuccess();
                console.log("Saving completed!");
                setIsModified(false);
                loadUsersPlaylists();
            } else {
                if (playlistName === "") {
                    setFailMessage("Please name your new playlist.");
                    console.log("Missing playlist name.");
                } else {
                    setFailMessage("Oops! An error occurred. Playlist is not saved.");
                }
                displayError();
                console.log("Saving NOT completed. Something went wrong.")
            }
            setIsSaving(false); 
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleEdit = async () => {
        if (isSaving) {
            console.log("Saving is already in motion!")
            return;
        }
        setIsSaving(true);
        try {
            const playlistId = openedPlaylistId;
            const isRenamed = await changePlaylistDetails(accessToken, playlistId, playlistName, "A Jammming playlist");
            let isEdited;
            if (playlist.length <= 100) {
                isEdited = await editPlaylist(accessToken, playlist, playlistId);
            } else {
                isEdited = await editPlaylist(accessToken, [], playlistId);
                if (!isEdited) {
                    soundTheAlarm("[Edit] The list is larger than 100 items. Something went wrong with setting it to [].");
                    return;
                }
                let tempPlaylist = [...playlist];
                while (tempPlaylist.length > 100) {
                    isEdited = await addTracksToPlaylist(accessToken, tempPlaylist.slice(0, 100 - tempPlaylist.length), playlistId);
                    if (!isEdited) {
                        soundTheAlarm("[Edit] The list is larger than 100 items. Something went wrong in the process of adding tracks.");
                        return;
                    }
                    tempPlaylist = tempPlaylist.slice(100);
                }
                isEdited = await addTracksToPlaylist(accessToken, tempPlaylist, playlistId);
            }
            const isCompleted = isEdited && isRenamed;
            if (isCompleted) {
                displaySuccess();
                setIsEditing(false);
                console.log("Changes successfully saved!");
                setIsModified(false);
                loadUsersPlaylists();
            } else {
                if (playlistName === "") {
                    setFailMessage("The playlist must have a name.");
                    console.log("Missing playlist name.");
                } else {
                    setFailMessage("Oops! An error occurred. Playlist is not saved.");
                }
                displayError();
                console.log("Changes are NOT saved. Something went wrong.")
            }
            setIsSaving(false); 
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <div className={`${styles.saveButtonWrapper} ${isScreenSmall || isScreenSmartphony || isScreenLarge ? styles.smallerSaveButtonWrapper : ""}`}>
            {!isEditing ? (
                <button className={styles.saveButton} onClick={handleSave}>
                    {isSaving ? "Saving..." : (isScreenSmall || isScreenSmartphony || isScreenLarge ? "Save" : "Save to Spotify")}
                </button>
                ) : (
                    <button className={styles.saveButton} onClick={handleEdit} > 
                        {isSaving ? "Saving..." : "Save changes"}
                    </button>
                )}
        </div>
    );
}

export default Save;
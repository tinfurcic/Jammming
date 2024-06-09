import React from 'react';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import styles from './Save.module.css';
import editPlaylist from '../helper functions/editPlaylist';
import changePlaylistDetails from '../helper functions/changePlaylistDetails';

function Save({ accessToken, playlist, setPlaylist, playlistName, setPlaylistName, isSaving, setIsSaving, setShowSuccessMessage, setShowFailMessage, setSearchText, setResults, isEditing, setIsEditing, openedPlaylistId, setUsersPlaylists, setShowUsersPlaylists }) {

    // Inconvenient problem: after renaming a playlist, it takes a while for the changes to become visible.
        // I could temporarily save new playlist details and display them until API calls fetch updated playlist details.

    const handleSave = async () => {
        if (isSaving) {
            console.log("Saving is already in motion!")
            return;
        }
        setIsSaving(true);
        try {
            const currentUserId = await findCurrentUserId(accessToken);
            const playlistId = await createPlaylist(accessToken, currentUserId, playlistName);
            const isCompleted = await addTracksToPlaylist(accessToken, playlist, playlistId);
            if (isCompleted) {
                setPlaylistName("");
                setPlaylist([]);
                setShowSuccessMessage(true);
                setShowFailMessage(false);
                console.log("Saving completed!")
            } else {
                setSearchText("");
                setResults([]);
                setShowFailMessage(true);
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
            const isRenamed = await changePlaylistDetails(accessToken, playlistId, playlistName, "A Jammming playlist"); // this doesn't work.
            const isEdited = await editPlaylist(accessToken, playlist, playlistId)
            const isCompleted = isEdited && isRenamed;
            if (isCompleted) {
                setPlaylistName("");
                setPlaylist([]);
                setShowSuccessMessage(true);
                setShowFailMessage(false);
                setIsEditing(false);
                console.log("Changes successfully saved!")
            } else {
                setSearchText("");
                setResults([]);
                setUsersPlaylists([]);
                setShowFailMessage(true);
                setShowUsersPlaylists(false);
                console.log("Changes are NOT saved. Something went wrong.")
            }
            setIsSaving(false); 
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <div>
            {!isEditing ? 
                <button className={styles.saveButton} onClick={handleSave}>
                    {isSaving ? "Saving..." : "Save to Spotify"}
                </button> :
                    <button className={styles.saveButton } onClick={handleEdit} > 
                        {isSaving ? "Saving..." : "Save changes"}
                    </button>
            }
        </div>
    );
}

export default Save;
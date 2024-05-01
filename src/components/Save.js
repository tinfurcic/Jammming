import React from 'react';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import refreshAccessToken from '../helper functions/refreshAccessToken';
import styles from './Save.module.css';

function Save({ accessTokenNew, setAccessTokenNew, setAccessTokenData, playlist, setPlaylist, playlistName, setPlaylistName, setIsSaving }) {

    const handleSave = async () => {
        setIsSaving(true);
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));
        const expirationTime = tokenData.expires_in;
        const isExpired = Date.now() / 1000 >= expirationTime;
        console.log("Saving the playlist to the account...");

        let newToken;
        if (isExpired) {
            newToken = await refreshAccessToken(setAccessTokenNew, setAccessTokenData);
            // This ensures that accessTokenNew updates immediately.
            // If it didn't, the API calls triggered with this click would fail.
        }
        const theValidToken = newToken || accessTokenNew;

        try {
            const currentUserId = await findCurrentUserId(theValidToken);
            console.log("The current user ID is " + currentUserId); // debugging

            const playlistId = await createPlaylist(theValidToken, currentUserId, playlistName);
            console.log("The ID of the created playlist is: " + playlistId); // debugging

            const isCompleted = await addTracksToPlaylist(theValidToken, playlist, playlistId);
            if (isCompleted) {
                setPlaylistName('');
                setPlaylist([]);
                console.log("Saving completed!")
            } else {
                console.log("Saving NOT completed. Something went wrong.")
            }
            setIsSaving(false); 
            // [DESIGN]
                // Indicate that the app is working.
                // Upon retrieving the response from addTracksToPlaylist, the work is done, so we can display a success message
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button className={styles.saveButton} onClick={handleSave}>
                Save to Spotify
                {/* {isSaving ? "Saving..." : "Save to Spotify"} */}
            </button>
        </div>
    );
}

export default Save;
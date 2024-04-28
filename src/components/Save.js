import React from 'react';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import refreshAccessToken from '../helper functions/refreshAccessToken';

function Save({ accessTokenNew, setAccessTokenNew, setAccessTokenData, playlist, playlistName }) {

    const handleSave = async () => {
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));
        const expirationTime = tokenData.expires_in;
        const isExpired = Date.now() / 1000 >= expirationTime;
        console.log("Saving the playlist to the account...");
        if (isExpired) {
            await refreshAccessToken(setAccessTokenNew, setAccessTokenData);
            // the accessTokenNew does not immediately update, causing issues in the following try block

        }
        
        try {
            const currentUserId = await findCurrentUserId(accessTokenNew);
            console.log("The current user ID is " + currentUserId); // debugging

            const playlistId = await createPlaylist(accessTokenNew, currentUserId, playlistName);
            console.log("The ID of the created playlist is: " + playlistId); // debugging

            const isCompleted = await addTracksToPlaylist(accessTokenNew, playlist, playlistId);
            if (isCompleted) {
                console.log("Saving completed!")
            } else {
                console.log("Saving NOT completed. Something went wrong.")
            }
            // [DESIGN]
                // Indicate that the app is working.
                // Upon retrieving the response from addTracksToPlaylist, the work is done, so we can display a success message
                // The current list of songs should be cleared, and the title should be reset to an empty string.
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    );
}

export default Save;
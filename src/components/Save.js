import React from 'react';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import refreshAccessToken from '../helper functions/refreshAccessToken';

function Save({ accessTokenNew, playlist, playlistName }) {

    const handleSave = async () => {
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));
        const expirationTime = tokenData.expires_in;
        const isExpired = Date.now() / 1000 >= expirationTime;
        if (isExpired) {
            console.log("Refreshing upon saving...")
            await refreshAccessToken();
            // here setAccessTokenNew(...) would probably do it
        }

        console.log("Saving the playlist to the account...");
        try {
            const currentUserId = await findCurrentUserId(accessTokenNew);
            console.log("The current user ID is " + currentUserId); // debugging

            const playlistId = await createPlaylist(accessTokenNew, currentUserId, playlistName);
            console.log("The ID of the created playlist is: " + playlistId); // debugging
            // console.log(playlist); // debugging

            const isCompleted = await addTracksToPlaylist(accessTokenNew, playlist, playlistId);
            if (isCompleted) {
                console.log("Saving completed!")
            } else {
                console.log("Saving NOT completed. Something went wrong.")
                console.log("Here's what we have: ")
                console.log(JSON.parse(localStorage.getItem("tokenData")));
                // once again, refreshToken is undefined here for some reason, after successfully refreshing
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
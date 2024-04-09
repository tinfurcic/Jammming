import React, { useState } from 'react';
import { generateAuthUrl } from '../helper functions/generateAuthUrl';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';

function Save({ accessTokenNew, playlist, playlistName }) {

    const handleSave = async () => {
        if (accessTokenNew === '') {
            // later, you have to change this condition to: "if access token is invalid (expired or nonexistent)"
                // alternatively, you can ensure elsewhere that the access token is up to date, but checking here seems better.
            //window.location.href = generateAuthUrl();
        } else {
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
                }
                // [DESIGN]
                    // Indicate that the app is working.
                    // Upon retrieving the response from addTracksToPlaylist, the work is done, so we can display a success message
                    // The current list of songs should be cleared, and the title should be reset to an empty string.
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    );
}

export default Save;
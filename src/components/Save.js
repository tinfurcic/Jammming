import React from 'react';
import findCurrentUserId from '../helper functions/findCurrentUserId';
import createPlaylist from '../helper functions/createPlaylist';
import addTracksToPlaylist from '../helper functions/addTracksToPlaylist';
import refreshAccessToken from '../helper functions/refreshAccessToken';
import styles from './Save.module.css';
import getUsersPlaylists from '../helper functions/getUsersPlaylists';
import getPlaylist from '../helper functions/getPlaylist';


function Save({ accessToken, setAccessToken, playlist, setPlaylist, playlistName, setPlaylistName, isSaving, setIsSaving, setShowSuccessMessage, setShowFailMessage, setSearchText, setResults }) {

    const handleSave = async () => {

        if (isSaving) {
            console.log("Saving is already in motion!")
            return;
        }

        setIsSaving(true);
        const tokenData = JSON.parse(localStorage.getItem("tokenData"));
        const expirationTime = tokenData.expires_in;
        const isExpired = Date.now() / 1000 >= expirationTime;
        console.log("Saving the playlist to the account...");

        let newToken;
        if (isExpired) {
            newToken = await refreshAccessToken(setAccessToken);
            // This ensures that accessToken updates immediately.
        }
        const theValidToken = newToken || accessToken;

        try {
            const currentUserId = await findCurrentUserId(theValidToken);
            console.log("The current user ID is " + currentUserId); // debugging


            const usersPlaylists = await getUsersPlaylists(currentUserId, theValidToken);
            const numOfPlaylists = usersPlaylists.length;
            console.log("You currently have " + numOfPlaylists + " playlists (and another one is being added)."); // debugging

            const fetchedPlaylist = await getPlaylist(usersPlaylists[0].id, theValidToken);
            const firstPlaylist = await getPlaylist(usersPlaylists[numOfPlaylists - 1].id, theValidToken);
            console.log("Your first playlist, with an id of: " + usersPlaylists[numOfPlaylists - 1].id); // debugging
            console.log(firstPlaylist); // debugging


            const playlistId = await createPlaylist(theValidToken, currentUserId, playlistName);
            console.log("The newly created playlist, with an id of " + playlistId + ":"); // debugging
            console.log(fetchedPlaylist); // debugging

            const isCompleted = await addTracksToPlaylist(theValidToken, playlist, playlistId);

            if (isCompleted) {
                setPlaylistName('');
                setPlaylist([]);
                setShowSuccessMessage(true);
                setShowFailMessage(false);
                console.log("Saving completed!")
            } else {
                setSearchText('');
                setResults([]);
                setShowFailMessage(true);
                console.log("Saving NOT completed. Something went wrong.")
            }
            setIsSaving(false); 

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button className={styles.saveButton} onClick={handleSave}>
                {isSaving ? "Saving..." : "Save to Spotify"}
            </button>
        </div>
    );
}

export default Save;
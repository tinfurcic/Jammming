import React, { useEffect } from "react";
import Playlist from "./Playlist";
import styles from "./UsersPlaylists.module.css";
import findCurrentUserId from "../helper functions/findCurrentUserId";
import getUsersPlaylists from "../helper functions/getUsersPlaylists";
import checkTokenValidity from "../helper functions/checkTokenValidity";

function UsersPlaylists ({accessToken, setAccessToken, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, usersPlaylists, setUsersPlaylists, showFailMessage}) {

    const failMessage = "Oops! An error occurred. Changes are not saved."

    useEffect(() => {
        const loadUsersPlaylists = async () => {
            const theValidToken = await checkTokenValidity(accessToken, setAccessToken)
            const userId = await findCurrentUserId(theValidToken);
            const fetchedPlaylists = await getUsersPlaylists(userId, theValidToken);
            setUsersPlaylists(fetchedPlaylists);
        }
        loadUsersPlaylists();
    }, [accessToken, setAccessToken, setUsersPlaylists]);

    return (
        <div className={styles.usersPlaylistsContainer} >
            {usersPlaylists.length === 0 ? (
                showFailMessage ? <div className={styles.message}>{failMessage}</div> : null) :
                    <div className={styles.tableHeading}>
                        <h2>Your playlists:</h2>
                    </div>
            }
            <ul>
                {usersPlaylists ?
                    usersPlaylists.map((playlist) =>
                        <li key={playlist.id}>
                            <Playlist accessToken={accessToken} setAccessToken={setAccessToken} playlistInfo={playlist} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} />
                        </li>) :
                            <p>Loading playlists...</p>
                }
            </ul>
        </div>            
    );
}

export default UsersPlaylists;
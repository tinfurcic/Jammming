import React, { useEffect } from "react";
import Playlist from "./Playlist";
import styles from "./UsersPlaylists.module.css";
import getCurrentUserData from "../helper functions/getCurrentUserData";
import getUsersPlaylists from "../helper functions/getUsersPlaylists";

function UsersPlaylists ({accessToken, setAccessToken, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, usersPlaylists, setUsersPlaylists, showFailMessage}) {

    const failMessage = "Oops! An error occurred. Changes are not saved."

    useEffect(() => {
        let isMounted = true;
        const loadUsersPlaylists = async () => {
            try {
                const userData = await getCurrentUserData(accessToken);
                if (isMounted) {
                    const userId = userData.id;
                    const fetchedPlaylists = await getUsersPlaylists(userId, accessToken);
                    if (isMounted) {
                        setUsersPlaylists(fetchedPlaylists);
                    }
                }
            }
            catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        if (accessToken) {
            loadUsersPlaylists();
        }
        return () => {
            isMounted = false;
        }
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
                            <Playlist accessToken={accessToken} playlistInfo={playlist} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} />
                        </li>) :
                            <p>Loading playlists...</p>
                }
            </ul>
        </div>            
    );
}

export default UsersPlaylists;
import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";
import styles from "./UsersPlaylists.module.css";
import getCurrentUserData from "../helper functions/getCurrentUserData";
import getUsersPlaylists from "../helper functions/getUsersPlaylists";

function UsersPlaylists ({accessToken, setAccessToken, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, usersPlaylists, setUsersPlaylists, showFailMessage, setIsBrowsing, setIsManaging}) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const loadUsersPlaylists = async () => {
            try {
                const userData = await getCurrentUserData(accessToken);
                if (isMounted) {
                    const userId = userData.id;
                    const fetchedPlaylists = await getUsersPlaylists(userId, accessToken);
                    if (isMounted) {
                        setUsersPlaylists(fetchedPlaylists);
                        setIsLoading(false);
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
    }, [accessToken, setAccessToken, setUsersPlaylists, setIsLoading]);

    return (
        <div className={styles.usersPlaylistsContainer} >
            {usersPlaylists.length === 0 ? (
                <div className={styles.message}>{isLoading ? "Loading..." : "You don't have any saved playlists at the moment."}</div>
                ) : (
                <div className={styles.tableHeading}>
                    <h2>My playlists</h2>
                </div>
                )
            }
            <ul>
                {usersPlaylists ?
                    usersPlaylists.map((playlist) =>
                        <li key={playlist.id}>
                            <Playlist accessToken={accessToken} playlistInfo={playlist} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} />
                        </li>) :
                            <p>Loading playlists...</p>
                }
            </ul>
        </div>            
    );
}

export default UsersPlaylists;
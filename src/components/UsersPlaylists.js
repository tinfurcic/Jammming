import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";
import styles from "./UsersPlaylists.module.css";
import getUsersPlaylists from "../helper functions/getUsersPlaylists";

function UsersPlaylists ({accessToken, setAccessToken, userData, setPlaylist, setPlaylistName, setIsEditing, setOpenedPlaylistId, usersPlaylists, setUsersPlaylists, showFailMessage, setIsBrowsing, setIsManaging, isScreenSmall, isScreenSmartphony, setIsPlaylistLoading}) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const loadUsersPlaylists = async () => {
            try {
                let userId;
                if (userData) {
                    userId = userData.id;
                }
                const fetchedPlaylists = await getUsersPlaylists(userId, accessToken);
                if (isMounted) {
                    setUsersPlaylists(fetchedPlaylists);
                    setIsLoading(false);
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
    }, [accessToken, setAccessToken, setUsersPlaylists, setIsLoading, userData]);

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
                            <Playlist accessToken={accessToken} userData={userData} playlistInfo={playlist} setPlaylist={setPlaylist} setPlaylistName={setPlaylistName} setIsEditing={setIsEditing} setOpenedPlaylistId={setOpenedPlaylistId} setIsBrowsing={setIsBrowsing} setIsManaging={setIsManaging} usersPlaylists={usersPlaylists} setUsersPlaylists={setUsersPlaylists} isScreenSmall={isScreenSmall} isScreenSmartphony={isScreenSmartphony} setIsPlaylistLoading={setIsPlaylistLoading} />
                        </li>) :
                            <p>Loading playlists...</p>
                }
            </ul>
        </div>            
    );
}

export default UsersPlaylists;
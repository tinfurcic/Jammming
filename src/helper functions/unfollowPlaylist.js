async function unfollowPlaylist (accessToken, playlistId) {

    const unfollowPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        method: 'DELETE',
        headers: {  
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (unfollowPlaylistResponse.ok) {
        return true;
    } else {
        console.error("Failed to unfollow (delete) the playlist.");
    }
}

export default unfollowPlaylist;
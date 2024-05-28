

async function getUsersPlaylists(userId, accessToken) {

    const getUsersPlaylistsResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'GET',
        headers: {  
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (getUsersPlaylistsResponse.ok) {
        const usersPlaylists = await getUsersPlaylistsResponse.json();
        return usersPlaylists;
    } else {
        console.error("Failed to get user's playlists.");
    }
}

export default getUsersPlaylists;
async function getPlaylist(playlistId, accessToken) {

    const getPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'GET',
        headers: {  
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (getPlaylistResponse.ok) {
        const playlist = await getPlaylistResponse.json();
       return playlist.tracks.items;
    } else {
        console.error("Failed to get user's playlists.");
    }
}

export default getPlaylist;
async function getPlaylist(playlistId, accessToken, nextLink) {

    let fetchLink;
    nextLink ? fetchLink = nextLink : fetchLink = `https://api.spotify.com/v1/playlists/${playlistId}`;

    const getPlaylistResponse = await fetch(fetchLink, {
        method: 'GET',
        headers: {  
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (getPlaylistResponse.ok) {
        const playlist = await getPlaylistResponse.json();
        if (nextLink) {
            return playlist;
        } else {
            return playlist.tracks;
        }
    } else {
        console.error("Failed to get user's playlists.");
    }
}

export default getPlaylist;
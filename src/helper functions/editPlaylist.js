async function editPlaylist (accessToken, trackArray, playlistId) {

    const uriArray = trackArray.map((track) => track.uri);

    const editPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uriArray.join(",")}`, {
        method: 'PUT',
        headers: {  
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }/*,
        body: JSON.stringify({
            'uris': uriArray
          })*/ // either this, or writing the uris down as a query parameter
    });
    if (editPlaylistResponse.ok) {
        return true;
    } else {
        console.error("Failed to save changes to the playlist.")
        return false;
    }
}

export default editPlaylist;
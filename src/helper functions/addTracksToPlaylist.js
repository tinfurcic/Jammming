async function addTracksToPlaylist (accessTokenNew, trackArray, playlistId) {

    const uriArray = trackArray.map((track) => track.uri);

    const addItemsToPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {  
            'Authorization': 'Bearer ' + accessTokenNew,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'uris': uriArray,
            'position': 0
          })
    });
    if (addItemsToPlaylistResponse.ok) {
        return true;
    } else {
        console.error('Failed to add items to playlist.');
    }   
}

export default addTracksToPlaylist;
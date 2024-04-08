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
        // const playlistWithTracks = await addItemsToPlaylistResponse.json();
        // return playlistWithTracks.snapshot_id; // in case you want to do something with this instead
        return true; // time will tell do I really need this
    } else {
        console.error('Something is wrong.');
    }   
}

export default addTracksToPlaylist;
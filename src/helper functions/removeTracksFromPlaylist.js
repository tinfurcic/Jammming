// This wasn't tested yet.

async function removeTracksFromPlaylist (accessToken, playlistId, tracksToDelete) {

    const removeTracksFromPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'DELETE',
        headers: {  
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: {
            "tracks": tracksToDelete // assuming tracksToDelete is an array of objects containing uri properties. I think.
        }
    });
    if (removeTracksFromPlaylistResponse.ok) {
        return true;
    } else {
        console.error("Failed to remove tracks from the playlist.");
    }
}

export default removeTracksFromPlaylist;
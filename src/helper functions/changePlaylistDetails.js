async function changePlaylistDetails (accessToken, playlistId, playlistName, playlistDescription) {
    // note: the app currently doesn't allow the user to add (or edit) a playlist description.
        // Would it be bad if a playlist description could be added ONLY when editing?
        // Not giving that option upon playlist creation would make the creation simpler.

    if (!playlistName) {
        return false;
    }

    const changePlaylistDetailsResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {  
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": playlistName,
            "description": playlistDescription
        })
    });
    if (changePlaylistDetailsResponse.ok) {
        return true;
    } else {
        console.error("Failed to save changes to playlist details.")
        return false;
    }
}

export default changePlaylistDetails;
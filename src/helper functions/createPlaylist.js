async function createPlaylist(accessToken, userId, playlistName) {
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {  
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': playlistName,
            'description': "New playlist description",
            'public': false
          })
    });
    if (createPlaylistResponse.ok) { // warning: you might want to return the whole theFolder object, instead of just theFolder.id
        const theFolder = await createPlaylistResponse.json();
        return theFolder.id;
    } else {
        console.error('Failed to create a playlist.');
    }
    
}

export default createPlaylist;